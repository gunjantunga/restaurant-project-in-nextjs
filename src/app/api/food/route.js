import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { foodSchema } from "@/app/lib/foodsModal";


export async function POST(request) {

    const payload = await request.json();
    await mongoose.connect(connectionStr);
    let success = false;
    const food = new foodSchema({...payload,resto_id:new mongoose.Types.ObjectId(payload.resto_id)});
    const result = await food.save();
    if(result){
        success = true;
    }
    return NextResponse.json({ result, success });

}