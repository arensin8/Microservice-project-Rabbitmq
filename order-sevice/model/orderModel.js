const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [{
        _id: String,
    }],
    userEmail: String,
    totalPrice: Number,
  },
  { timestamps: true }
);

const OrderMdoel = mongoose.model("user", OrderSchema);

module.exports = {
  OrderMdoel,
};
