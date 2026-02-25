import Board from "../../../DB/models/board.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteUserByItsId = asyncHandler(async (req, res, next) => {
    const boardId = req.params.id;
    const { userId } = req.query;
    console.log(userId);
    const board = await Board.findById(boardId);

    if (!board) {
        return res.status(404).json({ message: "Board not found" });
    }
    const deletedUser = await Board.findByIdAndUpdate(
        boardId,
        {
            $pull: { users: userId }
        },
        { new: true }
    );
    console.log(deletedUser);
    if (deletedUser.users.length === board.users.length) {
    return res.status(404).json({
        status:'fail',
        message:'User was not found in the array, nothing removed.'
    })
}




    return res.status(200).json({
        status: 'success',
        message: 'Employee deleted successfully from the board'
    })
})

export default deleteUserByItsId