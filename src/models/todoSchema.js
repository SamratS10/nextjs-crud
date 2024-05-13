import mongoose,{Schema} from "mongoose";

const todoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

const Todo = mongoose.models.todo || mongoose.model("Todo",todoSchema)
export default Todo

