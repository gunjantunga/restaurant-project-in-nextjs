import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModal";
import { NextResponse } from "next/server";


export async function GET(request, content) {
    let data = await content.params;
    let success;
    await mongoose.connect(connectionStr);
    const foods = await foodSchema.find({ resto_id: new mongoose.Types.ObjectId(data.id) });
    if (foods) {
        success = true;
    } else {
        success = false;
    }
    return NextResponse.json({ result: foods, success: success })


}

export async function DELETE(request,content) {
    let data = await content.params;
    let success;
    await mongoose.connect(connectionStr);
    const food = await foodSchema.deleteOne({ _id: new mongoose.Types.ObjectId(data.id) })
    if (food) {
        success = true
    } else {
        success = false;
    }

    return NextResponse.json({ result: food, success: success })

}