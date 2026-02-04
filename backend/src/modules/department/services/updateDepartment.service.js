import Department from "../../../DB/models/department.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const updateDepartment=asyncHandler(async(req , res , next)=>{
    const {id}=req.params;
    const {title , leadrId}=req.body;
    const updatedDepartment= await Department.findByIdAndUpdate(id , {title , leadrId} , {new:true , runValidators:true})
    if (!updatedDepartment) {
        return res.status(404).json({
            message: "Department not found"
        })
    }
    return res.status(200).json({
        message: "Department updated successfully",
        updatedDepartment
    })
})

export default updateDepartment