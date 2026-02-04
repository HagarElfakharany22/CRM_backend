import Board from "../../../DB/models/board.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getBoardByOwnerId=asyncHandler(async(req , res , next)=>{
    const owner=req.user._id;
    const boards= await Board.find({owner});
    if(boards.length===0){
        return res.status(404).json({message:'no boards found for this user'})
    }
    return res.status(200).json({
        message:'boards retrieved successfully',
        boards
    })
})

export default getBoardByOwnerId