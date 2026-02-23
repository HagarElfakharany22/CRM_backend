import AssignedTasksList from "../../../DB/models/assignedTasksList.model.js";
import { asyncHandler } from "../../../utilities/error/error";

const getAssignedtasksByEmpId=asyncHandler(async(req , res , next)=>{
    const id=req.user._id;
    
})

export default getAssignedtasksByEmpId;