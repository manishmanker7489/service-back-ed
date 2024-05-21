import express from "express";
import User from "../models/User.js";
import Provider from "../models/Provider.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// User Register
router.post("/register/user", async (req, res) => {
  const { userName, password, email, userNumber, userAddress } = req.body;
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


// User Login
router.post("/login/user", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) return res.status(401).send("Invalid username or password.");

    const validPassword = await user.comparePassword(password);
    if (!validPassword)
      return res.status(401).send("Invalid username or password.");

    const token = jwt.sign({ _id: user._id }, "your_jwt_secret_user", { expiresIn: "1h" });
    res.header("Authorization", `Bearer ${token}`).send({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in.");
  }
});

router.post("/register/provider", async (req, res) => {
  const { providerName, password, email, providerNumber, providerAddress, serviceName, minPrice, maxPrice } = req.body;
  try {
    const provider = new Provider({
      providerName,
      password,
      email,
      providerNumber,
      providerAddress,
      serviceName,
      minPrice,
      maxPrice
    });
     provider.save().then((data)=>{
       res.status(201).send("provider registered successfully. ");
     }).catch((err)=> console.log(err)) ;
  } catch (err) {
    res.status(400).send("Error registering provider. ");
  }
});

router.post("/login/provider", async (req, res) => {
  const { providerName, password } = req.body;
  try {
    const provider = await Provider.findOne({ providerName });
    if (!provider) return res.status(401).send("Invalid username or password.");
    
    const validPassword = await provider.comparePassword(password);
    console.log(validPassword);
    if (!validPassword)
      return res.status(401).send("Invalid username or password.");

    const token = jwt.sign({ _id: provider._id }, "your_jwt_secret_provider", { expiresIn: "1h" });
    res.header("Authorization", `Bearer ${token}`).send({ token, provider });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in.");
  }
});

export default router;
