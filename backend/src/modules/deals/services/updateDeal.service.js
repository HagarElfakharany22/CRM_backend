import Deal from "../../../DB/models/deal.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const updateDeal= asyncHandler(async(req , res , next)=>{
    const dealId=req.params.id
    const {title ,value ,  stage ,probability ,  expectedCloseDate , contacts , lead}= req.body;
    const updatedDeal = await Deal.findByIdAndUpdate(dealId , {title ,value ,  stage ,probability ,  expectedCloseDate , contacts , lead} , {new:true});
    console.log(updatedDeal);
    if(!updatedDeal){
        return res.status(404).json({
            status:"fail",
            message:'lead not found'
        })
    }
    return res.status(200).json({
        status:'success',
        message:'lead updated successfully',
        updatedDeal
    })
    
})

export default updateDeal