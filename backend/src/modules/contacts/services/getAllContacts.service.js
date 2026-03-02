import Contact from "../../../DB/models/contact.model.js";
import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAllContacts= asyncHandler(async(req , res , next)=>{
    const userId= req.user._id;
    const user= await User.findById(userId);
    const { search } = req.query;
    let filter = {};
    console.log(user);
    if(!(user.role=='admin' ||user.role=='manager' || user.role=='leader') ){
        return res.status(401).json({
            status:'fail',
            message:"you're not authorized "
        })
    }
    if (search) {
    filter = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ],
    };
  }
    const contacts= await Contact.find(filter);
    if(contacts.length==0){
        return res.status(404).json({
            status:"fail",
            message:"no contacts found"
        })
    }
    return res.status(200).json({
        status:'success',
        message:"contacts retrieved successfully",
        contacts
    })
})

export default getAllContacts