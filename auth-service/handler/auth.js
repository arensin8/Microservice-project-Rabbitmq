const { UserMdoel } = require("../model/userModel");

const AuthRouter = require("express").Router();
const jwt = require("jsonwebtoken");

AuthRouter.post("/register", async (req, res, next) => {
  try {
    const { password, name, email } = req.body;
    const existUser = await UserMdoel.findOne({ email });
    if (existUser) throw { message: "User already exists" };
    const newUser = new UserMdoel({
      name,
      email,
      password,
    });
    await newUser.save();
    return res.json({
      message: "new user created",
    });
  } catch (error) {
    next(error);
  }
});

AuthRouter.post("/login", async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const existUser = await UserMdoel.findOne({ email }, { __v: 0 });
    if (!existUser) throw { message: "User not found!" };
    if (existUser.password !== password)
      throw { message: "Password is incorrect" };
    delete existUser.password;
    jwt.sign(
      { email, userID: existUser._id, name: existUser.name },
      "secretKey",
      (err, token) => {
        if (!err) return res.json({ token });
        return res.json({ error: err.message });
      }
    );
    await newUser.save();
    return res.json({
      message: "new user created",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  AuthRouter,
};
