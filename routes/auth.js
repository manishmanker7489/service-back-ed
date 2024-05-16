const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { username, password, email, userNumber, userAddress } = req.body;
  try {
    const user = new User({
      username,
      password,
      email,
      userNumber,
      userAddress,
    });
    await user.save();
    res.status(201).send("User registered successfully.");
  } catch (err) {
    res.status(400).send("Error registering user.");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid username or password.");

    const validPassword = await user.comparePassword(password);
    if (!validPassword)
      return res.status(400).send("Invalid username or password.");

    const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
    res.header("Authorization", token).send({ token });
  } catch (err) {
    res.status(400).send("Error logging in.");
  }
});

module.exports = router;
