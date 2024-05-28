const express = require("express");
const { ProductRouter } = require("./handler/product");
const app = express();
require("dotenv").config();
require("./config/mongoose.config");

const { PORT } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/product", ProductRouter);
app.use((req, res, next) => {
  return res.json({ error: "notfound" });
});
app.use((error, req, res, next) => {
  return res.json({ error: error.message });
});

app.listen(PORT, () => {
  console.log("Product-service running over port:", PORT);
});
