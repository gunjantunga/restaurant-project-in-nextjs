import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { userSchema } from "@/app/lib/userModal";


export async function POST(req) {

    const payload = await req.json();
    await mongoose.connect(connectionStr);

    let success = false;
    const result = await userSchema.findOne({ email: payload.email, password: payload.password });
    console.log('result',result);
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success })

}

