import Attendance from "../../../DB/models/attendance.model.js";

export const logout = async (req, res) => {
  try {
    const userId = req.user._id;
console.log(userId)
    const attendance = await Attendance.findOne({
      user: userId,
      checkOutAt: null,
    });

    if (!attendance) {
      return res.status(400).json({
        message: "No active check-in found",
      });
    }

    attendance.checkOutAt = new Date();
    await attendance.save();

    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
