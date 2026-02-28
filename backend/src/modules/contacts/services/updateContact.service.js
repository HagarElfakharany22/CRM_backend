import Contact from "../../../DB/models/contact.model.js";
import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const updateContact= asyncHandler(async(req , res , next)=>{
const contactId=req.params.id
    const userId= req.user._id;
    const {name , email , phone, company ,title, createdFromLead}= req.body;
    const updatedcontact = await Contact.findByIdAndUpdate(contactId , {name , email , phone, company ,title, createdFromLead} , {new:true});
    console.log(updatedcontact);
    if(!updatedcontact){
        return res.status(404).json({
            status:"fail",
            message:'contact not found'
        })
    }
    return res.status(200).json({
        status:'success',
        message:'contact updated successfully',
        updatedcontact
    })
})

export default updateContact