import Lead from "../../../DB/models/Lead.model.js";

import { asyncHandler } from "../../../utilities/error/error.js";

const createLead= asyncHandler(async(req , res , next)=>{
    const id= req.user._id;
    const {name ,email ,  phone ,company ,  status , source , assignedTo}= req.body;
    const newLead= await Lead.create({name , email , phone , company , status , source , assignedTo , createdBy:id})
    console.log(newLead);
    if(!newLead){
        return res.status(400).json({
            status:'fail',
            message:'error creating lead'
        })
    }
    return res.status(201).json({
        satus:'success',
        message:'lead created successfully',
        newLead
    })
    
})

export default createLead