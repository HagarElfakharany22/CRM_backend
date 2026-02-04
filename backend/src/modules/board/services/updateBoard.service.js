import Board from "../../../DB/models/board.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const updateBoard= asyncHandler(async(req , res , next)=>{
    const {id}=req.params;
    const {title , description}=req.body;
    const updatedBpard= await Board.findByIdAndUpdate(id , {title , description} , {new:true , runValidators:true})
    if (!updatedBpard) {
        return res.status(404).json({
            message:'Board not found'
        })
    }
    return res.status(200).json({
        message:'Board updated successfully',
        updatedBpard
    })
})

export default updateBoard;