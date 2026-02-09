import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const assignTask = asyncHandler(async (req, res, next) => {
    const { userId } = req.body;
    const { taskId } = req.params;
    const task = await Tasks.findByIdAndUpdate(
  taskId,
  { $set: { userId: userId }},
  { new: true }
);
    if (!task) {
        return res.status(404).json({ message: "task not found" });
    }
    return res.status(200).json({
        message: 'Task assigned successfully',
        task
    })
})

export default assignTask;