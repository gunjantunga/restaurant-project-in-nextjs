import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { resturantSchema } from "@/app/lib/resturantModals";

export async function GET() {

    await mongoose.connect(connectionStr);

    let result = await resturantSchema.find();
    result = result.map((item) => item.city.toLowerCase());
    result = [...new Set(result)];
    result = result.map((item)=>item.charAt(0).toUpperCase()+item.slice(1));
    return NextResponse.json({ result, success: true });

}