const express = require("express");
const {  OrderRouter } = require("./handler/order");
const app = express();
require("dotenv").config();
require("./config/mongoose.config");

const { PORT } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/order", OrderRouter);
app.use((req, res, next) => {
  return res.json({ error: "notfound" });
});
app.use((error, req, res, next) => {
  return res.json({ error: error.message });
});


app.listen(PORT, () => {
  console.log("Order-service running over port:", PORT);
});