"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import AddTodoDialog from "../dialog"


const BlogOverview = ()=>{
    const initialData = {
        title:"",
        description:""
    }
    const [todoDialog,setTodoDialog] = useState(false)
    const [todoFormData,setTodoFormData] = useState(initialData)
    const handleFormSubmit = async()=>{
        try{
            const request = await fetch("/api/add-todo",{
                method:"POST",
                body:JSON.stringify(todoFormData)
            })
            const result = await request.json()
            if(result?.success){
                setTodoFormData(initialData)
                setTodoDialog(false)
            }
        }
        catch(e){
            console.log(e.message)
        }
    }
    return(
        <div className=" min-h-screen flex flex-col gap-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="m-5">
                <Button onClick={()=>setTodoDialog(true)}>Add Task</Button>
                <AddTodoDialog todoDialog={todoDialog} setTodoDialog={setTodoDialog} todoFormData={todoFormData} setTodoFormData={setTodoFormData} handleFormSubmit={handleFormSubmit}/>
            </div>
            <div>
                Add Blog List
            </div>
        </div>
    )
}

export default BlogOverview