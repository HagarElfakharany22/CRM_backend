import Tasks from "../../../DB/models/tasks.model.js";
import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getDashboardData=asyncHandler(async(req , res , next)=>{
    // const tasks= await Tasks.find();
    // const users = await User.find();
    const tasks = await Tasks.aggregate([
    { $group: { _id: "$priority", count: { $sum: 1 } } }
  ]);
  const users = await User.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } }
  ]);

    return res.status(200).json({
        status:'success',
        message:'dashboard data retrieved successfully',
        tasks,
        users
    })
})

export default getDashboardData