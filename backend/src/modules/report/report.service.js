import Attendance from "../../DB/models/attendance.model.js";
import mongoose from "mongoose";
const getMonthlyReport=async(req , res , next)=>{
 try {
    console.log("i am in func");
    
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const report = await Attendance.aggregate([
      {
        $match: {
          loginAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
          $expr: { $ne: [{ $dayOfWeek: "$loginAt" }, 6] } // استبعد يوم الجمعة
        }
      },
      {
        $project: {
          user: 1,
          loginAt: 1,
          logoutAt: 1,
          durationHours: { $divide: [{ $subtract: ["$logoutAt", "$loginAt"] }, 1000*60*60] }
        }
      },
      {
        $group: {
          _id: "$user",
          totalHours: { $sum: "$durationHours" },
          totalDays: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userData"
        }
      },
      { $unwind: "$userData" },
      {
        $project: {
          name: "$userData.name",
          email: "$userData.email",
          totalHours: 1,
          totalDays: 1
        }
      },
      { $sort: { totalHours: -1 } }
    ]);

    return res.json(report);
  } catch (err) {
    console.error("Error in aggregation:", err);
    return [];
  }
}
export default getMonthlyReport;
 

