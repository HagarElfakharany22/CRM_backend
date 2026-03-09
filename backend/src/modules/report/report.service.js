import Attendance from "../../DB/models/attendance.model.js";
import mongoose from "mongoose";
const getMonthlyReport = async (req, res, next) => {
  try {

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const report = await Attendance.aggregate([
      {
        $match: {
          checkInAt: { $gte: firstDay, $lte: lastDay }
        }
      },

      {
        $project: {
          user: 1,

          day: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$checkInAt"
            }
          },

          durationHours: {
            $divide: [
              { $subtract: ["$checkOutAt", "$checkInAt"] },
              1000 * 60 * 60
            ]
          }
        }
      },

      {
        $group: {
          _id: {
            user: "$user",
            day: "$day"
          },
          totalHoursPerDay: { $sum: "$durationHours" }
        }
      },

      {
        $group: {
          _id: "$_id.user",
          totalDays: { $sum: 1 },
          totalHours: { $sum: "$totalHoursPerDay" }
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
          totalDays: 1,
          totalHours: { $round: ["$totalHours", 2] }
        }
      },

      { $sort: { totalHours: -1 } }

    ]);

    res.json(report);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};
export default getMonthlyReport;
 

