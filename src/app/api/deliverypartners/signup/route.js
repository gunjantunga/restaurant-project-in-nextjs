import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartnersModal";
export async function POST(request) {

    const payload = await request.json();
    await mongoose.connect(connectionStr);
    let success = false;

    let partner = new deliveryPartnerSchema(payload);
    let result = await partner.save();
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success });
}