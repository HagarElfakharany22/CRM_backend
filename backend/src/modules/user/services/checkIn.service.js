import Attendance from "../../../DB/models/attendance.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
import moment from "moment";
// export const checkIn = async (req, res) => {
  // try {
//     const userId = req.user._id;

//     const existing = await Attendance.findOne({
//       user: userId,
//       // checkOutAt: null,
//     });

//     if (existing) {
//       return res.status(400).json({
//         message: "Already checked in",
//         attendance: existing,
//       });
//     }
//     const newAttendance = await Attendance.create({
//       user: userId,
//       checkInAt: new Date(),
//       ipAddress: req.ip,
//       userAgent: req.headers["user-agent"],
//     });
// console.log(newAttendance);
//     res.status(201).json(newAttendance);

  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
// };

export const checkIn= asyncHandler(async(req , res , next)=>{
//    const userId = req.user.id; // from auth middleware
//   const today = moment().format("YYYY-MM-DD");
//   const now = moment();

//   const shiftStart = moment(today + " 09:00:00"); // shift start
//   const graceMinutes = 10;

//   // Check existing record
//   const existing = await db.query(
//     "SELECT * FROM attendance WHERE user_id = ? AND date = ?",
//     [userId, today]
//   );

//   if (existing.length > 0 && existing[0].check_in) {
//     return res.status(400).json({status : 'fail', message: "Already checked in" });
//   }

//   let lateMinutes = 0;

//   if (now.isAfter(shiftStart.clone().add(graceMinutes, "minutes"))) {
//     lateMinutes = now.diff(shiftStart, "minutes");
//   }

//   if (existing.length === 0) {
//     await db.query(
//       "INSERT INTO attendance (user, date, checkInAt, late_minutes, status) VALUES (?, ?, ?, ?, ?)",
//       [userId, today, now.format("YYYY-MM-DD HH:mm:ss"), lateMinutes, "PRESENT"]
//     );
//   } else {
//     await db.query(
//       "UPDATE attendance SET check_in=?, late_minutes=?, status='PRESENT' WHERE id=?",
//       [now.format("YYYY-MM-DD HH:mm:ss"), lateMinutes, existing[0].id]
//     );
//   }

//  return res.json({status : 'succsess', message: "Check-in successful", lateMinutes });
 const userId = req.user._id;
    const now = new Date();

    const today = now.toISOString().split("T")[0]; // YYYY-MM-DD

    const shiftStart = new Date(`${today}T10:00:00`);
    const graceMinutes = 10;

    let attendance = await Attendance.findOne({
      user: userId,
      date: today,
    });

    if (attendance && attendance.checkInAt) {
      return res.status(400).json({status:'fail', message: "Already checked in" });
    }

    let lateMinutes = 0;

    const lateLimit = new Date(shiftStart.getTime() + graceMinutes * 60000);

    if (now > lateLimit) {
      lateMinutes = Math.floor((now - shiftStart) / 60000);
    }
    console.log(`lateMinutes : ${lateMinutes}` );
    

    if (!attendance) {
      attendance = new Attendance({
        user: userId,
        date: today,
        checkInAt: now,
        late_minutes: lateMinutes,
        status: "PRESENT",
      });
    } else {
      attendance.checkInAt = now;
      attendance.late_minutes = lateMinutes;
      attendance.status = "PRESENT";
    }

    await attendance.save();

    res.json({
      message: "Check-in successful",
      lateMinutes,
    });
})

