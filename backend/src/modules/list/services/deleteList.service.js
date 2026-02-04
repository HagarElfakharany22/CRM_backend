import Lists from "../../../DB/models/lists.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteList= asyncHandler(async(req , res , next)=>{
    const {id}=req.params;
    const deletedList= await Lists.findByIdAndDelete(id)
    if (!deletedList) {
    return res.status(404).json({ message: "List not found" });
    }
    return res.status(200).json({
        message: "List deleted successfully"
    })
})

export default deleteList;