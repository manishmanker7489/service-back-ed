import {authUser} from '../middleware/auth.js'
import express from "express";
import {serchSevice , giveRating} from '../controllers/user.js'

const router = express.Router();

router.post("/serch-service" , authUser ,serchSevice );

router.post("/give-rating", authUser, giveRating);

export default router