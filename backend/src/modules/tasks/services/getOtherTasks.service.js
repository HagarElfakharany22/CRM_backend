import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getOtherTasks=asyncHandler(async(req , res , next)=>{
    const tasks= await Tasks.find({status:{$ne:'done'}});
    if(tasks.length===0){
        return res.status(404).json({message:'no tasks found'})
    }
    return res.status(200).json({
        message:'tasks retrieved successfully',
        tasks
    })
})

export default getOtherTasks;