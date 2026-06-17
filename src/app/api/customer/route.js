import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { resturantSchema } from "@/app/lib/resturantModals";

export async function GET(request) {
    const queryParams = request.nextUrl.searchParams;

    let filter = {};

    if (queryParams.get("location")) {
        const city = queryParams.get("location");

        filter.city = {
            $regex: new RegExp(city, "i"),
        };
    }

    if (queryParams.get("restaurant")) {
        const name = queryParams.get("restaurant");

        filter.resturantName = {
            $regex: new RegExp(name, "i"),
        };
    }

    await mongoose.connect(connectionStr);

    const result = await resturantSchema.find(filter);

    return NextResponse.json({
        result,
        success: true,
    });
}