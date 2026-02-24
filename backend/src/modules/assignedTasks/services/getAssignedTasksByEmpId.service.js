import AssignedTasksList from "../../../DB/models/assignedTasksList.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAssignedtasksByEmpId=asyncHandler(async(req , res , next)=>{
    const id=req.user._id;
    const { boardId } = req.params;
    const assignedTasks= await AssignedTasksList.find({userId : id , boardId}).populate('tasks').populate('userId' , 'name')
    if(assignedTasks.length==0){
        return res.status(404).json({
            status:'fail',
            message:'no assigned tasks found for this user'
        })
    }
    return res.status(200).json({
        status:'success',
        message:'assigned tasks retrived successfully',
        assignedTasks
    })
    
    
})

export default getAssignedtasksByEmpId;