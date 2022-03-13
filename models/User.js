const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "restricted"],
    default: "restricted",
    required: true,
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
