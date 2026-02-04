import Department from "../../../DB/models/department.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const addUsersToDepartment=asyncHandler(async(req , res , next)=>{
    const {id} = req.params;
    const {userIds}=req.body;
  const department= await Department.findByIdAndUpdate(
  id,
  { $addToSet: { usersDepartment: { $each: userIds } } },
  { new: true }
);
if (!department) {
    return res.status(404).json({ message: "Department not found" });
}
return res.status(200).json({
    message: "Users added to department successfully",
    department
})

})

export default addUsersToDepartment;