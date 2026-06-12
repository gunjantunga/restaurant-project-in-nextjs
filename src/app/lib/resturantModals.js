import mongoose from "mongoose";

const resturantModals = new mongoose.Schema({
    email: String,
    password: String,
    resturantName: String,
    city: String,
    address: String,
    contactNumber: Number
})

export const resturantSchema = mongoose.models.resturants || mongoose.model("resturants", resturantModals);