import Lists from "../../../DB/models/lists.model.js";
import Tasks from "../../../DB/models/tasks.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const updateTaskList = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {listId , changedListId} = req.body;
  


  const updatedTask = await Tasks.findByIdAndUpdate(id, {listId}, { new: true, runValidators: true });
   const updatedList=await Lists.findByIdAndUpdate(listId , {$push:{tasks:id}} , {new:true} );
   const updateChangedList=await Lists.findByIdAndUpdate( changedListId , {$pull:{tasks:id}} , {new:true} );
  if (!updatedTask || !updatedList) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.status(200).json({
    message: "Task updated successfully",
    updatedTask
  });
})

export default updateTaskList;