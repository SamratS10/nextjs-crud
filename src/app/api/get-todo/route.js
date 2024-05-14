import Todo from "@/models/todoSchema";
import connectToDb from "@/database/connectToDb";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectToDb()
        const data = await Todo.find({})
        if(data){
            return NextResponse.json({
                success:true,
                data:data
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"Something went wrong! pls try later..."
            })
        }

    }
    catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}