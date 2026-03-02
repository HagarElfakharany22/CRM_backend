import Contact from "../../../DB/models/contact.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getContactsByUserId=asyncHandler(async(req , res , next)=>{
  const userId = req.user._id;
   const { search } = req.query;
    // let filter = {};
//     if (search) {
//     filter = {
//       $or: [
//         { name: { $regex: search, $options: "i" } },
//         { email: { $regex: search, $options: "i" } },
//         { phone: { $regex: search, $options: "i" } },
//         { status: { $regex: search, $options: "i" } },
//         { source: { $regex: search, $options: "i" } },
//       ],
//     };
//   }
const query = {
    owner: userId, // all leads must belong to this user
    ...(search && {   // only add $or if search exists
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ],
    }),
  };
    // const contacts = await Contact.find({owner:userId , filter})
    const contacts = await Contact.find(query);
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