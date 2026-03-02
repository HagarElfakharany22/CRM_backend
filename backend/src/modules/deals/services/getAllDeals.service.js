import Deal from "../../../DB/models/deal.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
import User from "../../../DB/models/User.model.js";
const getAllDeals= asyncHandler(async(req , res , next)=>{
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
            { title: { $regex: search, $options: "i" } },
            { contacts: { $regex: search, $options: "i" } },
            { lead: { $regex: search, $options: "i" } },
            { value: { $regex: search, $options: "i" } },
            { stage: { $regex: search, $options: "i" } },
            { probability: { $regex: search, $options: "i" } },
            { expectedCloseDate: { $regex: search, $options: "i" } },
          ],
        };
      }
      const deals= await Deal.find(filter).populate('contacts').populate('lead')
      if(deals.length==0){
        return res.status(404).json({
            status:"fail",
            message:"no deals found"
        })
    }
    return res.status(200).json({
        status:'success',
        message:"deals retrieved successfully",
        deals
    })
})

export default getAllDeals