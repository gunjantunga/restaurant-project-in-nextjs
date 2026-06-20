import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { foodSchema } from "@/app/lib/foodsModal";

export async function GET(request, content) {

    let data = await content.params;
    let success;
    await mongoose.connect(connectionStr);

    const food = await foodSchema.findOne({ _id: new mongoose.Types.ObjectId(data.id) });

    if (food) {
        success = true;
    } else {
        success = false;
    }
    return NextResponse.json({ result: food, success: success })
}

export async function PUT(request, content) {

    await mongoose.connect(connectionStr);
    let payload = await request.json();
    let data = await content.params;
    let success;

    const food = await foodSchema.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(data.id) }, payload);
    if (food) {
        success = true;
    } else {
        success = false;
    }
    return NextResponse.json({ result: food, success: success })

}