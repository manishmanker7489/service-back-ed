const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { userName, password, email, userNumber, userAddress } = req.body;
  console.log(userNumber  +"     ---------");
  try {
    const user = new User({
      userName,
      password,
      email,
      userNumber,
      userAddress,
    });
    await user.save();
    res.status(201).send("User registered successfully.");
  } catch (err) {
    res.status(400).send("Error registering user. 12");
  }
});

// Login

  router.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    try {
      const user = await User.findOne({ userName });
      if (!user) return res.status(401).send("Invalid username or password."); 
  
      const validPassword = await user.comparePassword(password);
      if (!validPassword)
        return res.status(401).send("Invalid username or password.");
  
      const token = jwt.sign({ _id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
      res.header("Authorization", `Bearer ${token}`).send({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error logging in.");
    }
  });

module.exports = router;
