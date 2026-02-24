import Tasks from "../../../DB/models/tasks.model.js";
import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const assignTask = asyncHandler(async (req, res, next) => {
//     const { email } = req.body;
//     const { taskId } = req.params;
//     let user= await User.findOne({email})

//     const task = await Tasks.findByIdAndUpdate(
//   taskId,
//   { $set: { userId: user._id }},
//   { new: true }
// );
//     if (!task) {
//         return res.status(404).json({ message: "task not found" });
//     }
//     return res.status(200).json({
//         message: 'Task assigned successfully',
//         task
//     })
})

export default assignTask;