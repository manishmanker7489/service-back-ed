import {authUser} from '../middleware/auth.js'
import express from "express";

import Provider from '../models/Provider.js'

const router = express.Router();

router.post("/serch-service" , authUser , async (req, res) => {
    const serviceName  = req.body.serviceName;
    const provider = await Provider.find({serviceName:serviceName})
    const sanitizedProviders = provider.map(provider => {
        const providerObject = provider.toObject(); // Convert to plain object
        delete providerObject.password; // Remove the password key
        return providerObject; // Return the sanitized object
      });
    res.send({sanitizedProviders});
});

export default router