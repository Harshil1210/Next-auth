import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
