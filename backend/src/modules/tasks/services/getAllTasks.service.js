import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAllTasks=asyncHandler(async(req , res , next)=>{
    const tasks= await Tasks.find();
    if(tasks.length===0){
        return res.status(404).json({message:'no tasks found'})
    }
    return res.status(200).json({
        message:'tasks retrieved successfully',
        tasks
    })
})

export default getAllTasks;