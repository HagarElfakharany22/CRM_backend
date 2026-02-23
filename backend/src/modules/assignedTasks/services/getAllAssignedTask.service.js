import AssignedTasksList from "../../../DB/models/assignedTasksList.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";


const getAllAssignedTasks= asyncHandler(async(req , res , next)=>{
    const assignedTasks=await AssignedTasksList.find().populate('tasks').populate('userId' , 'name')
    if(!assignedTasks){
        return res.status(404).json({message:"no assigned tasks found"})
    }
    return res.status(200).json({
        status:"success",
        message:"assigned tasks retrived successfully",
        assignedTasks
    })
})

export default getAllAssignedTasks