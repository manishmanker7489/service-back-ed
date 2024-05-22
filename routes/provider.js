import { authProvider } from '../middleware/auth.js'
import express from "express";
import Provider from '../models/Provider.js';


const router = express.Router();

router.post("/edit-info", authProvider, async (req, res) => {
    let resData = req.body;
    let id = req.body.id;

    if (!resData || !id) {
        res.status(400).json({ message: "Bad Request, id and form data is missing", error: "Bad Request, id and form data is required: " })
    }

    try {
        const newData = await Provider.findByIdAndUpdate(id, {
            providerName: resData.providerName,
            providerNumber: resData.providerNumber,
            providerAddress: resData.providerAddress,
            serviceName: resData.serviceName,
            rating: 0,
            noOfRating: 0,
            minPrice: resData.minPrice,
            maxPrice: resData.maxPrice,
        }, { new: true });
    
        res.status(200).send({ message:"Provider Data updated.. ",  data: newData });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error" , error:error})
    }
});

export default router