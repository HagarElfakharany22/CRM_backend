import Lists from "../../../DB/models/lists.model.js";
import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const reorderListTasks = asyncHandler(async (req, res, next) => {
  const { sourceListId, destinationListId, sourceTasks, destinationTasks, taskId } = req.body;

  if (!sourceListId || !destinationListId || !sourceTasks || !destinationTasks || !taskId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Update the destination list
  await Lists.findByIdAndUpdate(destinationListId, { tasks: destinationTasks }, { new: true });

  // Update the source list if it's different from destination list
  if (sourceListId !== destinationListId) {
    await Lists.findByIdAndUpdate(sourceListId, { tasks: sourceTasks }, { new: true });
    
    // Also update the listId on the task itself
    await Tasks.findByIdAndUpdate(taskId, { listId: destinationListId }, { new: true });
  }

  return res.status(200).json({
    message: "Tasks reordered successfully"
  });
});

export default reorderListTasks;
