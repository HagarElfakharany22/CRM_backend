import mongoose, { Schema, model } from "mongoose";
// import { userRoles } from "../../middleware/auth.middleware.js";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["manager", "employee", "leaders", "user"],
      default: "user"
    },

    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks",
      },
    ],
  },
  { timestamps: true }
);
const User = model('users', userSchema) || mongoose.models.users;
export default User;