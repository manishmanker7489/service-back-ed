import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";


const ProviderSchema = new Schema({
  providerName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  providerNumber: Number,
  providerAddress: String,
  serviceName: String,
  rating: { type: Number, default: 0 },
  noOfRating: { type: Number, default: 0 },
  minPrice: Number,
  maxPrice: Number,
});

ProviderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

ProviderSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model("Provider", ProviderSchema);
