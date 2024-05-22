import { authProvider } from '../middleware/auth.js'
import express from "express";
import Provider from '../models/Provider.js';


const router = express.Router();

router.post("/edit-info", async (req, res) => {
    let resData = req.body;
    let id = req.body.id;

    const newData = await Provider.findByIdAndUpdate(id, {
        providerName: resData.providerName,
        providerNumber: resData.providerNumber,
        providerAddress: resData.providerAddress,
        serviceName: resData.serviceName,
        rating: 0,
        noOfRating: 0,
        minPrice: resData.minPrice,
        maxPrice: resData.maxPrice,
    },{new:true});

    res.send({ data: newData });
});

export default router