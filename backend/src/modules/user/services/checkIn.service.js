import Attendance from "../../../DB/models/attendance.model.js";

export const checkIn = async (req, res) => {
  try {
    const userId = req.user._id;

    const existing = await Attendance.findOne({
      user: userId,
      checkOutAt: null,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already checked in",
        attendance: existing,
      });
    }

    const newAttendance = await Attendance.create({
      user: userId,
      checkInAt: new Date(),
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });
console.log(newAttendance);
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};