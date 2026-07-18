import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { userSchema } from "@/app/lib/userModal";

export async function POST(request) {

    const payload = await request.json();
    await mongoose.connect(connectionStr);
    let success = false;

    let user = new userSchema(payload);
    let result = await user.save();
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success });
}