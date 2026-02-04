import Department from "../../../DB/models/department.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteDepartment=asyncHandler(async(req , res , next)=>{
    const {id}=req.params;
    const deletedDepartment= await Department.findByIdAndDelete(id)
    if (!deletedDepartment) {
    return res.status(404).json({ message: "Department not found" });
    }
    return res.status(200).json({
        message: "Department deleted successfully",
        deletedDepartment
    })
})
export default deleteDepartment;