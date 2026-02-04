import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const addTask=asyncHandler(async (req , res , next)=>{
    const {title , description , linkReference , status ,deadline}=req.body;
    const newTask=await Tasks.create({title , description , image: req.file ? req.file.filename : null , linkReference , status , deadline , userId:req.user._id})
    return res.status(201).json({
        message:'Task added successfully',
        newTask
    })
    
})

export default addTask;