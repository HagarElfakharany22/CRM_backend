import Contact from "../../../DB/models/contact.model.js";
import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteContact= asyncHandler(async(req , res , next)=>{
const contatId= req.params.id;
    const userId= req.user._id;
    const user= await User.findById(userId);
    console.log(user);
    if(!(user.role=='admin' ||user.role=='manager' || user.role=='leader') ){
        return res.status(401).json({
            status:'fail',
            message:"you're not authorized "
        })
    }
    const deletedContact= await Contact.findByIdAndDelete(contatId);
    console.log(deletedContact);
    
    if(!deletedContact){
        return res.status(404).json({
            status:"fail",
            message:"contact not found"
        })
    }
    return res.status(200).json({
        status:"success",
        message:"contact deleted successfully",
        deletedContact
    })

})

export default deleteContact