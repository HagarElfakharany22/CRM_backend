import Deal from "../../../DB/models/deal.model.js";
import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteDeal= asyncHandler(async(req , res , next)=>{
    const dealId= req.params.id;
    const userId= req.user._id;
    const user= await User.findById(userId);
    console.log(user);
    if(!(user.role=='admin' ||user.role=='manager' || user.role=='leader') ){
        return res.status(401).json({
            status:'fail',
            message:"you're not authorized "
        })
    }
    const deletedDeal= await Deal.findByIdAndDelete(dealId);
    console.log(deletedDeal);
    
    if(!deletedDeal){
        return res.status(404).json({
            status:"fail",
            message:"deal not found"
        })
    }
    return res.status(200).json({
        status:"success",
        message:"deal deleted successfully",
        deletedDeal
    })
})

export default deleteDeal