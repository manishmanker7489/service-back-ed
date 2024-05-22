import express from 'express';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import { connetMongoDb } from './connection/mongoConnect.js';
import userRoute from './routes/user.js'
import providerRouter from './routes/provider.js'

const app = express();

//connect mongodeb
connetMongoDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/user", userRoute);
app.use("/api/provider" ,providerRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
