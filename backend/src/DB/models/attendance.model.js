// models/attendance.model.js
import mongoose, { Schema, model } from "mongoose";

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  loginAt: {
    type: Date,
    required: true,
  },
  logoutAt: {
    type: Date,
  },
  ipAddress: String,
  userAgent: String,
}, { timestamps: true });
const Attendance = model('Attendance', attendanceSchema) || mongoose.models.Attendance;
export default Attendance;

