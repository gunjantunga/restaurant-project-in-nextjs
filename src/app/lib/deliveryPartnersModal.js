import mongoose from "mongoose";

const deliveryPartnerModal = new mongoose.Schema({
    name: String,
    password: String,
    city: String,
    address: String,
    mobile: Number
})

export const deliveryPartnerSchema = mongoose.models.deliverypartners || mongoose.model("deliverypartners", deliveryPartnerModal);