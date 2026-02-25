import Board from "../../../DB/models/board.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getBoardByItsId=asyncHandler(async(req , res , next)=>{
    const id=req.params.id;
    const board= await Board.findById(id).populate('owner' , 'name email ').populate('users' , 'name email role')
    if(!board){
        return res.status(404).json({message:"Board not found"})
    }
    return res.status(200).json({
        message:"Board retrieved successfully",
        board
    })
})

export default getBoardByItsId;