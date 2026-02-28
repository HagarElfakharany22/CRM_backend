import Contact from "../../../DB/models/contact.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getContactsByUserId=asyncHandler(async(req , res , next)=>{
  const userId = req.user._id;
    const contacts = await Contact.find({owner:userId})
    if(contacts.length==0){
        return res.status(404).json({
            status:"fail",
            message:'no contacts found'
        })
    }
    return res.status(200).json({
        status:"success",
        message:'contacts retrieved successfully',
        contacts
    })
})

export default getContactsByUserId