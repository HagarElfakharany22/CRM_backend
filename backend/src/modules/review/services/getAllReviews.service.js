import Review from "../../../DB/models/review.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAllReviews=asyncHandler(async(req,res,next)=>{
 const reviews= await Review.find();
    if(reviews.length===0){
        return res.status(404).json({message:'no review found'})
    }
    return res.status(200).json({
        message:'reviews retrieved successfully',
        reviews
    })
})
export default getAllReviews;