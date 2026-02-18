import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
import User from "../../../DB/models/User.model.js";
import AssignedTasksList from "../../../DB/models/assignedTasksList.model.js";
const createTaskByAdmin=asyncHandler(async(req , res , next)=>{
    const {title , description , linkReference , status ,deadline  , email ,boardId }=req.body;
     let user= await User.findOne({email})
     console.log(user);
     if(!user){
        return res.status(404).json({
            message:"user not found"
        })
     }
     let assignedTasksList= await AssignedTasksList.findOne({userId:user._id})
     if(!assignedTasksList){
         assignedTasksList= await AssignedTasksList.create({boardId , userId:user._id})
        
     }
     console.log(assignedTasksList);
    const newTask=await Tasks.create({title , description , image: req.file ? req.file.filename : null , linkReference , status , deadline , listId:assignedTasksList._id , userId:user._id})
    if(!newTask){
        return res.status(400).json({message:'failed to add task'})
    }
   const updatedList=await AssignedTasksList.findByIdAndUpdate(assignedTasksList._id , {$push:{tasks:newTask._id}} , {new:true} );

    return res.status(201).json({
        status:"success",
        message:'Task added successfully',
        newTask,
        updatedList
    })
})

export default createTaskByAdmin