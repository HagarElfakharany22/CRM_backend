import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const assignTask=asyncHandler(async(req , res , next)=>{
    const {title , description , linkReference , deadline ,userId }= req.body;
    const newTask= await Tasks.create({title , description , image: req.file ? req.file.filename : null , linkReference , deadline , userId });
    return res.status(201).json({
        message:'Task assigned successfully',
        newTask
    })
})

export default assignTask;