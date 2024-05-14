import connectToDb from "@/database/connectToDb";
import Todo from "@/models/todoSchema";
import { NextResponse } from "next/server";
import Joi from "joi";


const AddNewTodo = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required()
})

export async function PUT(req){
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
        const extractData = await req.json()
        const {title,description} = extractData 
        const {error} = AddNewTodo.validate({title,description})
        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })
        }
        const updateData = await Todo.findByIdAndUpdate(getCurrentId,{title,description},{new:true})
        if(updateData){
            return NextResponse.json({
                success:true,
                message:"Data updated successfully"
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