import Department from "../../../DB/models/department.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAllDepartments= asyncHandler(async(req , res , next)=>{
    const departments= await Department.find();
    if(departments.length===0){
        return res.status(404).json({message:'no departments found'})
    }
    return res.status(200).json({
        message:'departments retrieved successfully',
        departments
    })
})
export default getAllDepartments;