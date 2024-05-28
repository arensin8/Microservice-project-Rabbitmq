const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth-service", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to auth-service MongoDB");
  } catch (err) {
    console.error("Can't connect to auth-service MongoDB", err);
  }
}

connectToDatabase();
