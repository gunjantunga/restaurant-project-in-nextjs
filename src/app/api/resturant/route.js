import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { resturantSchema } from "@/app/lib/resturantModals";

export async function GET() {
  const db = await mongoose.connect(connectionStr);

  const data = await resturantSchema.find();
  console.log(data);
  return NextResponse.json({ result: "true" });
}

export async function POST(request) {
  const payload = await request.json();
  await mongoose.connect(connectionStr);
  let result;
  let success=false;
  if(payload.login){
    result = await resturantSchema.findOne({email:payload.email,password:payload.password});
    if(result){
      success=true;
    }
  }else{
    const resturant = new resturantSchema(payload);
     result = await resturant.save();
     if(result){
      success=true;
     }
  }
 
  return NextResponse.json({ result, success});

}