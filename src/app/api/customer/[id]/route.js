

import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { resturantSchema } from "@/app/lib/resturantModals";
import { foodSchema } from "@/app/lib/foodsModal";

export async function GET(request, content) {

    let { id } = await content.params;
    let success;
    await mongoose.connect(connectionStr);

    let restaurant = await resturantSchema.findOne({ _id: id });
    let foodItems = await foodSchema.find({resto_id:id});
    if (restaurant ) {
        success = true
    } else {
        success= false
    }

    return NextResponse.json({ restaurant,foodItems, success })
}