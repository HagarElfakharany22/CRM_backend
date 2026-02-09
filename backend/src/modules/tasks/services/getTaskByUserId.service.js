import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getTasksByUserId=asyncHandler(async(req , res , next)=>{
    const userId=req.user._id;
    const tasks= await Tasks.find({userId});
    if(tasks.length===0){
        return res.status(404).json({message:'no tasks found for this user'})
    }
    return res.status(200).json({
        message:'tasks retrieved successfully',
        tasks
    })
})

export default getTasksByUserId;