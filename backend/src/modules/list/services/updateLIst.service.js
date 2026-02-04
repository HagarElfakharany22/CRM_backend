import Lists from "../../../DB/models/lists.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const updateList=asyncHandler(async(req , res , next)=>{
    const {id}=req.params;
    const {title}=req.body;
    const updatedList= await Lists.findByIdAndUpdate(id , {title} , {new:true , runValidators:true})
    if (!updatedList) {
        return res.status(404).json({
            message: "List not found"
        })
    }
    return res.status(200).json({
        message:'List updated successfully',
        updatedList
    })
})

export default updateList