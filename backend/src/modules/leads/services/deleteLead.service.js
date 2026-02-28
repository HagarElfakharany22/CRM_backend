import Lead from "../../../DB/models/Lead.model.js";
import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteLead= asyncHandler(async(req , res , next)=>{
    const leadId= req.params.id;
    const userId= req.user._id;
    const user= await User.findById(userId);
    console.log(user);
    if(!(user.role=='admin' ||user.role=='manager' || user.role=='leader') ){
        return res.status(401).json({
            status:'fail',
            message:"you're not authorized "
        })
    }
    const deletedLead= await Lead.findByIdAndDelete(leadId);
    console.log(deletedLead);
    
    if(!deletedLead){
        return res.status(404).json({
            status:"fail",
            message:"lead not found"
        })
    }
    return res.status(200).json({
        status:"success",
        message:"lead deleted successfully",
        deletedLead
    })
})

export default deleteLead