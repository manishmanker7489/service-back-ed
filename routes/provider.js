import { authProvider } from '../middleware/auth.js'
import express from "express";

import Provider from '../models/Provider.js'

const router = express.Router();

router.post("/serch-service" , authUser , async (req, res) => {
    const serviceName  = req.body.serviceName;
    const provider = await Provider.find({serviceName:serviceName})

    const providerList = provider.map((item)=> {
        delete item.password;
    } )

    res.send({providerList});
});

export default router