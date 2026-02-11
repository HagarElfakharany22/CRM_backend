import Attendance from "../../../DB/models/attendance.model.js";

export const logout = async (req, res) => {
  const { attendanceId } = req.body;

  if (!attendanceId) {
    return res.status(400).json({ message: "attendanceId is required" });
  }

  const attendance = await Attendance.findByIdAndUpdate(
    attendanceId,
    { logoutAt: new Date() },
    { new: true }
  );

  res.json({ message: "logout success", attendance });
};
