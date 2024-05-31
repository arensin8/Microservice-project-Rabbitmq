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

    // Fetch products
    const products = await ProductModel.find({ _id: { $in: productIDs } });
    if (!products.length) {
      return res
        .status(404)
        .json({ error: "No products found with the given IDs" });
    }

    const { email } = req.user;

    // Push to order queue
    await pushToQueue("ORDER", { products, userEmail: email });

    // Create product queue and consume messages
    const channel = await createQueue("PRODUCT");

    // Acknowledge that the request was received and is being processed
    res.status(202).json({ message: "Order is being processed" });

    // Handle incoming messages from the queue
    channel.consume(
      "PRODUCT",
      (msg) => {
        console.log(JSON.parse(msg.content.toString()));
        // Add further handling here if needed
      },
      { noAck: true }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = {
  ProductRouter,
};
