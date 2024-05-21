import express from "express";
import {authUser , authProvider , authBoth} from "../middleware/auth.js"

const router = express.Router();

router.get("/protected/user" , authUser , (req, res) => {
  res.send("This is a protected route for user.");
});

router.get("/protected/provider", authProvider  , (req, res) => {
  res.send("This is a protected route for provider.");
});

router.get("/protected/both", authBoth  , (req, res) => {
  res.send("This is a protected route for both.");
});

export default router;
