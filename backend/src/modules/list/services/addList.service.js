import Lists from "../../../DB/models/lists.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const addList=asyncHandler(async(req , res , next)=>{
    const {title , boardId}= req.body;
    const newList= await Lists.create({title , boardId})
    return res.status(201).json({
        message:'List added successfully',
        newList
    })

})

export default addList;