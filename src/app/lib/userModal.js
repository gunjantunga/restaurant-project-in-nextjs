import mongoose from "mongoose";

const userModal = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    city:String,
    address:String,
    contactNumber:Number
})

export const userSchema = mongoose.models.users || mongoose.model("users", userModal);