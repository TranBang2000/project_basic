const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, require: true, unique: true, minLength: 6 },
    password: { type: String, require: true, minLength: 6 },
    createAt: { type: Date, default: Date.now },
  },
  {
    collection: "users",
  }
);
const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
