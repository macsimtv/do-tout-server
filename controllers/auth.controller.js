const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const UserModel = require("../models/User");

module.exports = class UserController {
  static async login(req, res) {
    try {
      let { email, password } = req.body;

      const isUser = await UserModel.findOne({ email });
      if (!isUser) return res.status(400).json({ message: "User not found" });

      let { encryptedPassword, ...userInformations } = isUser._doc;

      let isCorrectPassword = await bcrypt.compare(password, encryptedPassword);

      if (!isCorrectPassword)
        return res.status(400).json({ message: "Invalid password" });

      let token = jwt.sign(userInformations, process.env.JWT_SECRET);

      return res.status(200).json({ token });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  static async register(req, res) {
    console.log(req.socket.localAddress, req.ip, req.socket.remoteAddress, req.connection.remoteAddress);
    try {
      let { email, password } = req.body;

      let encryptedPassword = await bcrypt.hash(password, 10);

      const existingUser = await UserModel.findOne({ email });

      if (existingUser)
        return res.status(400).json({ message: "Already registered" });

      let currentUser = new UserModel({
        email,
        encryptedPassword,
      });

      currentUser.save();

      return res.status(200).json(currentUser);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }
};
