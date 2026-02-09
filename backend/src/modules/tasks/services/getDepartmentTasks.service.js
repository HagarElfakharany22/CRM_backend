import Department from "../../../DB/models/department.model.js";
import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getDepartmentTasks=asyncHandler(async(req , res , next)=>{
    const {id}= req.params;
    const department= await Department.findById(id).populate("usersDepartment");
    if(!department){
        return res.status(404).json({message:'no tasks found'})
    }
    const users=department.usersDepartment;
    const userTasks=[];
     for (const user of users) {
        const tasks = await Tasks.find({ assignedTo: user._id });
        userTasks.push({
            name: user.name,
            tasks
        });
    }
  
    
    if (userTasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found' });
    }

    return res.status(200).json({
        message: 'Tasks retrieved successfully',
        userTasks
    });
})

export default getDepartmentTasks;