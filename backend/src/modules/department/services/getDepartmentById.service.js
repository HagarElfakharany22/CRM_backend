import Department from "../../../DB/models/department.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getDepartmentById= asyncHandler(async(req , res , next)=>{
    const {id}=req.params;
    const department= await Department.findById(id);
    if (!department) {
    return res.status(404).json({ message: "Department not found" });
    }
    return res.status(200).json({
        message: "Department retrieved successfully",
        department
    })
})
export default getDepartmentById