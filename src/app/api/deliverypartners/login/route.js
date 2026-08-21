import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartnersModal";

export async function POST(req) {

    const payload = await req.json();
    await mongoose.connect(connectionStr);

    let success = false;
    const result = await deliveryPartnerSchema.findOne({ mobile: payload.mobile, password: payload.password });
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success })

}

