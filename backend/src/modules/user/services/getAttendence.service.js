import Attendance from "../../../DB/models/attendance.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
const getAttendace= asyncHandler(async(req , res , next)=>{
    const attendance=  await Attendance.find()
  .populate({
    path: "user",
    select: "name email role",
    match: { role: { $ne: "admin" } }
  })
  .sort({ loginAt: -1 });
    if(!attendance){
      return res.status(404).json({message:'no attendance found'})
    }
    const filteredAttendance = attendance.filter(a => a.user !== null);
    return res.status(200).json({
        message:'attendeece retrieved successfully',
         attendance: filteredAttendance
    })
    
})
export default getAttendace;
