import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { orderSchema } from "@/app/lib/ordersModal";
import { resturantSchema } from "@/app/lib/resturantModals";
import { connectionStr } from "@/app/lib/db";

export async function POST(request) {
    try {

        const payload = await request.json();
        await mongoose.connect(connectionStr);
        let orderObj = new orderSchema({
            ...payload,
            user_Id: new mongoose.Types.ObjectId(payload.user_Id),
            resto_Id: new mongoose.Types.ObjectId(payload.resto_Id),
            // deliveryBoy_Id: new mongoose.Types.ObjectId(payload.deliveryBoy_Id),
            deliveryBoy_Id: payload.deliveryBoy_Id
        })

        let result = await orderObj.save();

        return NextResponse.json(
            {
                success: true,
                result
            },
            { status: 201 }
        );

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create order",
                error: error.message
            },
            { status: 500 }
        );

    }

}

export async function GET(request) {
    const userId = request.nextUrl.searchParams.get("id");
    let success = false;
    await mongoose.connect(connectionStr);
    let result = await orderSchema.find({ user_Id: userId });
    if (result) {

        let restoData = await Promise.all(
            result.map(async (item) => {
                let restoInfo = {};
                restoInfo = await resturantSchema.findOne({ _id: item.resto_Id });
                restoInfo.amount = item.amount;
                restoInfo.status = item.status;
                return restoInfo;
            }))
        result = restoData;
        success = true;

    }
    return NextResponse.json({
        result
    })
}
