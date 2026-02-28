import Lead from "../../../DB/models/Lead.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getLeadsByUserId = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const leads = await Lead.find({
        $or: [
            { createdBy: userId },
            { assignedTo: userId }
        ]
    })
    if(leads.length==0){
        return res.status(404).json({
            status:"fail",
            message:'no leads found'
        })
    }
    return res.status(200).json({
        status:"success",
        message:'leads retrieved successfully',
        leads
    })
    
})

export default getLeadsByUserId