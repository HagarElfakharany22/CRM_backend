import Lead from "../../../DB/models/Lead.model.js";
import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const updatLead= asyncHandler(async(req , res , next)=>{
    const leadId=req.params.id
    const userId= req.user._id;
    const user= await User.findById(userId);
    console.log(user);
    
    const lead= await Lead.findById(leadId)
    console.log('userId : ',user._id);
    
    console.log('createdBy : ',lead.createdBy);
    console.log('assignedTo : ',lead.assignedTo);
    
    
    console.log(( lead.createdBy==user._id));
    
    // if(!((user.role=='admin' ||user.role=='manager' || user.role=='leader')||( lead.assignedTo==user._id || lead.createdBy==user._id)) ){
    //     return res.status(401).json({
    //         status:'fail',
    //         message:"you're not authorized "
    //     })
    // }
    const {name ,email ,  phone ,company ,  status , source , assignedTo}= req.body;
    const updatedLead = await Lead.findByIdAndUpdate(leadId , {name ,email ,  phone ,company ,  status , source , assignedTo} , {new:true});
    console.log(updatedLead);
    if(!updatedLead){
        return res.status(404).json({
            status:"fail",
            message:'lead not found'
        })
    }
    return res.status(200).json({
        status:'success',
        message:'lead updated successfully',
        updatedLead
    })
    
})

export default updatLead