const { isAuthenticated } = require("../../isAuthenticated");
const { pushToQueue, createQueue } = require("../config/rabbitmq");
const { ProductModel } = require("../model/productModel");

const ProductRouter = require("express").Router();

ProductRouter.post("/create", async (req, res, next) => {
  try {
    const { name, desc, price } = req.body;
    const newProduct = new ProductModel({ name, desc, price });
    await newProduct.save();
    return res.json({
      message: "New product created",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
});

ProductRouter.post("/buy", isAuthenticated, async (req, res, next) => {
  try {
    const { productIDs = [] } = req.body;
    const products = ProductModel.find({ _id: { $in: productIDs } });
    const { email } = req.user;
    await pushToQueue("ORDER", { products, userEmail: email });
    const channel = await createQueue("PRODUCT");
    channel.consume("PRODUCT", (msg) => {
      console.log(JSON.parse(msg.content.toString()));
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  ProductRouter,
};
