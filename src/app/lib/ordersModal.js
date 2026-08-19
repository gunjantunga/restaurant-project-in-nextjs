import mongoose from "mongoose";

const orderModal = new mongoose.Schema({
    user_Id:mongoose.Schema.Types.ObjectId,
    foodItemsId:String,
    resto_Id:mongoose.Schema.Types.ObjectId,
    // deliveryBoy_Id:mongoose.Schema.Types.ObjectId,
    deliveryBoy_Id:String,
    status:String,
    amount:String
})

export const orderSchema = mongoose.models.orders || mongoose.model("orders", orderModal);