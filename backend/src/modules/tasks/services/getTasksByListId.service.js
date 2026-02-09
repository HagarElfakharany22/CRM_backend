import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getTasksByListId= asyncHandler(async(req , res , next)=>{
    const id =req.params.id;
    const tasks= await Tasks.find({listId:id})
    if(tasks.length===0){
        return res.status(404).json({message:'no tasks found for this list'})
    }
    return res.status(200).json({
        message:'tasks retrieved successfully',
        tasks
    })
})

export default getTasksByListId