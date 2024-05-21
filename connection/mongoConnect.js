import mongoose from "mongoose";

export const connetMongoDb = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/service")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

}