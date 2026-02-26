import Attendance from "../../../DB/models/attendance.model.js";

export const logout = async (req, res) => {
  //   try {
  //     const userId = req.user._id;
  // console.log(userId)
  //     const attendance = await Attendance.findOne({
  //       user: userId,
  //       checkOutAt: null,
  //     });

  //     if (!attendance) {
  //       return res.status(400).json({
  //         message: "No active check-in found",
  //       });
  //     }

  //     attendance.checkOutAt = new Date();
  //     await attendance.save();

  //     res.status(200).json(attendance);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }

  const userId = req.user.id;
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const shiftEnd = new Date(`${today}T17:30:00`);
    const shiftHours = 7;

    const attendance = await Attendance.findOne({
      user: userId,
      date: today,
    });

    if (!attendance || !attendance.checkInAt) {
      return res.status(400).json({ message: "Not checked in" });
    }

    if (attendance.checkOutAt) {
      return res.status(400).json({ message: "Already checked out" });
    }

    attendance.checkOutAt = now;

    // Calculate total minutes
    const totalMinutes = Math.floor(
      (attendance.checkOutAt - attendance.checkInAt) / 60000
    );

    // Convert to decimal hours
    const workHours = parseFloat((totalMinutes / 60).toFixed(2));
    attendance.workHours = workHours;

    // Early Leave
    let early_leave_minutes = 0;
    if (now < shiftEnd) {
      early_leave_minutes = Math.floor((shiftEnd - now) / 60000);
    }
    attendance.early_leave_minutes = early_leave_minutes;

    // Overtime
    if (workHours > shiftHours) {
      attendance.overtimeMinutes = Math.floor(
        (workHours - shiftHours) * 60
      );
    }

    await attendance.save();

    res.json({
      status:'success',
      message: "Check-out successful",
      workHours,
      overtimeMinutes: attendance.overtimeMinutes,
    });

};
