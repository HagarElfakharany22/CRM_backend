import Deal from "../../../DB/models/deal.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const createDeal= asyncHandler(async(req , res , next)=>{
    const id= req.user._id;
    const {title ,value ,  stage ,probability ,  expectedCloseDate , contacts , lead}= req.body;
    if (!title || !value) {
      return res.status(400).json({ message: "Title and value are required" });
    }
let calculatedProbability = probability;

    const stageProbabilityMap = {
      prospecting: 20,
      proposal: 50,
      negotiation: 75,
      won: 100,
      lost: 0
    };
    if (!probability && stage) {
      calculatedProbability = stageProbabilityMap[stage];
    }

    const newDeal = await Deal.create({
      title,
      contacts,
      lead,
      value,
      stage,
      probability: calculatedProbability,
      expectedCloseDate,
      owner:id
    });
    console.log(newDeal);
    if(!newDeal){
        return res.status(400).json({
            status:'fail',
            message:'error creating deal'
        })
    }
    return res.status(201).json({
        satus:'success',
        message:'deal created successfully',
        newDeal
    })
    
})

export default createDeal