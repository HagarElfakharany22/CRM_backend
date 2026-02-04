import Lists from "../../../DB/models/lists.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getListById= asyncHandler(async(req , res , next)=>{
    const {id}=req.params;
    const list= await Lists.findById(id)
    if (!list) {
    return res.status(404).json({ message: "List not found" });
    }
    return res.status(200).json({
        message: "List retrieved successfully",
        list
    })
})

export default getListById