import Board from "../../../DB/models/board.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteBoard=asyncHandler(async(req , res , next)=>{
    const {id}=req.params;
    const deletedBoard= await Board.findByIdAndDelete(id)
    if (!deletedBoard) {
    return res.status(404).json({ message: "Board not found" });
    }
    return res.status(200).json({
        message: "Board deleted successfully"
    })
})

export default deleteBoard;