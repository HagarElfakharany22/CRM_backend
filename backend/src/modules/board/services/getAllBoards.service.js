import Board from "../../../DB/models/board.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAllBoards=asyncHandler(async(req , res , next)=>{
    const boards= await Board.find();
    console.log(boards);
    
    if(boards.length===0){
        return res.status(404).json({message:'no boards found'})
    }
    return res.status(200).json({
        message:'boards retrieved successfully',
        boards
    })
})

export default getAllBoards;