import Department from "../../../DB/models/department.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const addDepartment=asyncHandler(async(req , res , next)=>{
    const {title , leadrId}=req.body;
    const newDepartment=await Department.create({title , leadrId})
    return res.status(201).json({
        message:'Department added successfully',
        newDepartment
    })
})

export default addDepartment;