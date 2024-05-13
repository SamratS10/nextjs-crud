import connectToDb from "@/database/connectToDb";
import Todo from "@/models/todoSchema";
import Joi from "joi"
import { NextResponse } from "next/server";


const AddNewTodo = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required()
})
export async function POST(req){
    try{
        await connectToDb()
        const extractData = await req.json()
        const {title,description} = extractData 
        const {error} = AddNewTodo.validate({title,description})
        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })
        }
        const addTodo = await Todo.create({title,description})
        if(addTodo){
            return NextResponse.json({
                success:true,
                message:"Todo added successfully"
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"something went wrong! please try again later"
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