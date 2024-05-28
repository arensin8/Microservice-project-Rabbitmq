const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/product-service", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to product-service MongoDB");
  } catch (err) {
    console.error("Can't connect to product-service MongoDB", err);
  }
}

connectToDatabase();
