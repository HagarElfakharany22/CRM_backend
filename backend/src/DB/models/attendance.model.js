// models/attendance.model.js
import mongoose, { Schema, model } from "mongoose";

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  checkInAt: {
    type: Date,

  },
  checkOutAt: {
    type: Date,
  },
  workHours: {
    type: Number,
    default: 0,
  },
  late_minutes: {
    type: Number,
    default: 0
  },
  early_leave_minutes: {
    type: Number,
    default: 0
  },
  overtimeMinutes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["PRESENT", "ABSENT", "HALF_DAY", "LEAVE"],
    default: "ABSENT"
  },
  ipAddress: String,
  userAgent: String,
}, { timestamps: true });
const Attendance = model('Attendance', attendanceSchema) || mongoose.models.Attendance;
export default Attendance;

