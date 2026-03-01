import Contact from "../../../DB/models/contact.model.js";
import Lead from "../../../DB/models/Lead.model.js";

import { asyncHandler } from "../../../utilities/error/error.js";

const createContact= asyncHandler(async(req , res , next)=>{
    const id= req.user._id;
    const {name , email , phone, company ,title, createdFromLead}= req.body;

    const lead = await Lead.findOne({_id:createdFromLead})
    console.log(lead);
    if(!lead){
        return res.status(404).json({
            status:"fail",
            message:"lead not found"
        })
    }
    console.log(`lead : ` , lead);
    
    
    const newContact= await Contact.create({name, email , phone , company , title , createdFromLead , owner:id})
    if(!newContact){
        return res.status(400).json({
            status:'fail',
            message:'error creating contact'
        })
    }
    return res.status(201).json({
        satus:'success',
        message:'contact created successfully',
        newContact
    })
    
})

export default createContact