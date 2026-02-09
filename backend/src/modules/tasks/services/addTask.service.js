import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
import Lists from "../../../DB/models/lists.model.js";
const addTask=asyncHandler(async (req , res , next)=>{
    const {title , description , linkReference , status ,deadline , listId}=req.body;
    const newTask=await Tasks.create({title , description , image: req.file ? req.file.filename : null , linkReference , status , deadline , userId:req.user._id , listId})
    if(!newTask){
        return res.status(400).json({message:'failed to add task'})
    }
   const updatedList=await Lists.findByIdAndUpdate(listId , {$push:{tasks:newTask._id}} , {new:true} );
   console.log('upadated list : ' , updatedList);
   
    return res.status(201).json({
        message:'Task added successfully',
        newTask
    })
    
})

export default addTask;