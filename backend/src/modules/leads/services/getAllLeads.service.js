import Lead from "../../../DB/models/Lead.model.js";
import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAllLeads= asyncHandler(async(req , res , next)=>{
    const userId= req.user._id;
    const user= await User.findById(userId);
    console.log(user);
    if(!(user.role=='admin' ||user.role=='manager' || user.role=='leader') ){
        return res.status(401).json({
            status:'fail',
            message:"you're not authorized "
        })
    }
    const leads= await Lead.find();
    if(leads.length==0){
        return res.status(404).json({
            status:"fail",
            message:"no leads found"
        })
    }
    return res.status(200).json({
        status:'success',
        message:"leads retrieved successfully",
        leads
    })
    
})
export default getAllLeads