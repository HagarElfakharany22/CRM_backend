import Lists from "../../../DB/models/lists.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAllLists=asyncHandler(async(req , res, next)=>{
    const lists= await Lists.find();
    if(lists.length===0){
        return res.status(404).json({message:'no lists found'})
    }
    return res.status(200).json({
        message:'lists retrieved successfully',
        lists
    })
})

export default getAllLists;