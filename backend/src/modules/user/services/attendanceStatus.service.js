import Attendance from "../../../DB/models/attendance.model.js";

export const getMyAttendanceStatus = async (req, res) => {
  try {
    const userId = req.user._id;

    const activeSession = await Attendance.findOne({
      user: userId,
      checkOutAt: null,
    });

    if (!activeSession) {
      return res.status(200).json({
        active: false,
      });
    }

    res.status(200).json({
      active: true,
      attendance: activeSession,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};