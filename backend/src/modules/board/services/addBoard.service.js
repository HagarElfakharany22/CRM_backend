import Board from "../../../DB/models/board.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const addBoard=asyncHandler(async(req , res , next)=>{
    const owner=req.user._id;
    const {title , description}=req.body;
    const newBoard=await Board.create({title , description , owner})
    return res.status(201).json({
        message:'Board added successfully',
        newBoard
    })
})

export default addBoard;