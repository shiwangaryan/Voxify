const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model.js");
require(dotenv).config();

const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      realName,
      showRealName,
      profilePicURL,
      registrationDate,
    } = req.body;

    // check if user exists already
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Use different username" });
    }

    // hash password
    const hashPass = await bcrypt.hash(password, 11);
    const newUser = new User({
      username,
      email,
      password: hashPass,
      realName,
      showRealName,
      profilePicURL,
      registrationDate,
    });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: `Error encoutnered: ${err}` });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if username exists or not
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    // pass doesnt match
    if (!passMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // password matches
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: `Error encountered: ${err}` });
  }
};

module.exports = { register, login };
