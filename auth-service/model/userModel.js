const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const UserMdoel = mongoose.model("user", UserSchema);

module.exports = {
  UserMdoel,
};
