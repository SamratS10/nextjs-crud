import connectToDb from "@/database/connectToDb";
import { NextResponse } from "next/server";
import Todo from "@/models/todoSchema";
export async function DELETE(req){
    try{
        await connectToDb()
        const {searchParams} = new URL(req.url)
        const getCurrentId = searchParams.get('id')
        if(!getCurrentId){
            return NextResponse.json({
                success:false,
                message:"Id is required"
            })
        }
        const deleteTodo = await Todo.findByIdAndDelete(getCurrentId)
        if(deleteTodo){
            return NextResponse.json({
                success:true,
                message:"Todo deleted successfully"
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