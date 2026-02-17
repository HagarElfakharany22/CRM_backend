import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
import User from "../../../DB/models/User.model.js";
import Lists from "../../../DB/models/lists.model.js";

const createTaskByAdmin=asyncHandler(async(req , res , next)=>{
    // لسة ال list اللي هي المفروض assigned
    const {title , description , linkReference , status ,deadline  , email}=req.body;
    console.log(`body : ` , req.body);
    
     let user= await User.findOne({email})
     console.log(user);
     if(!user){
        return res.status(404).json({
            message:"user not found"
        })
     }
     
    const newTask=await Tasks.create({title , description , image: req.file ? req.file.filename : null , linkReference , status , deadline , listId , userId:user._id})
    if(!newTask){
        return res.status(400).json({message:'failed to add task'})
    }
//    const updatedList=await Lists.findByIdAndUpdate(listId , {$push:{tasks:newTask._id}} , {new:true} );
//    console.log('upadated list : ' , updatedList);
   
    return res.status(201).json({
        message:'Task added successfully',
        newTask
    })
})

export default createTaskByAdmin