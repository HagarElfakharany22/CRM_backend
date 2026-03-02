import Contact from "../../../DB/models/contact.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
import Lead from "../../../DB/models/Lead.model.js";

const getContactsByLeadId= asyncHandler(async(req , res , next)=>{
    const leadId=req.params.id;
    const lead=await Lead.findById(leadId)
    console.log(lead);
    
     if(!lead){
        return res.status(404).json({
            status:'fail',
            message:"lead not found"
        })
    }
    const contacts= await Contact.find({createdFromLead:leadId})
    if(contacts.length==0){
        return res.status(404).json({
            status:'fail',
            message:"no contacts found"
        })
    }
    return res.status(200).json({
        status:"success",
        message:"contacts by lead id retrieved successfully",
        contacts
    })
})

export default getContactsByLeadId