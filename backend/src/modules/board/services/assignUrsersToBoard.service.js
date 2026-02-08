import Board from "../../../DB/models/board.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const assignUsersToBoard= asyncHandler(async(req , res , next)=>{
    const id=req.params.id;
    const {userIds}=req.body;
    const board= await Board.findByIdAndUpdate(
  id,
  { $addToSet: { users: { $each: userIds } } },
  { new: true }

);
if (!board) {
    return res.status(404).json({ message: "Board not found" });
}
return res.status(200).json({
    message: "Users assigned to board successfully",
    board
})
})

export default assignUsersToBoard;