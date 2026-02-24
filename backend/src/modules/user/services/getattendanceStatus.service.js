import Attendance from "../../../DB/models/attendance.model.js";

export const getMyAttendanceStatus = async (req, res) => {
  const userId = req.user._id;

  const activeAttendance = await Attendance.findOne({
    user: userId,
    checkOutAt: null,
  });



  return res.status(200).json({
    isCheckedIn: !!activeAttendance,
    attendance: activeAttendance || null,
  });
};