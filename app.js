const express = require("express");
const mongoose = require("mongoose");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/service")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected"); 

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
