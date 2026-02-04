import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteTask=asyncHandler(async(req , res , next)=>{
    const {id}=req.params;
    const deletedTask= await Tasks.findByIdAndDelete(id)
    if (!deletedTask) {
    return res.status(404).json({ message: "Task not found" });

  }
    return res.status(200).json({
        message: "Task deleted successfully",
        deletedTask
    })
})

export default deleteTask;