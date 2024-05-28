const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/order-service", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to order-service MongoDB");
  } catch (err) {
    console.error("Can't connect to order-service MongoDB", err);
  }
}

connectToDatabase();
