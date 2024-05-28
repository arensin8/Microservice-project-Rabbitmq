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

ProductRouter.post("/buy", async (req, res, next) => {
  try {
    const { productIDs = [] } = req.body;
    const productsList = ProductModel.find({ _id: { $in: productIDs } });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  ProductRouter,
};
