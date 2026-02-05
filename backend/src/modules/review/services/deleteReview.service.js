import Review from "../../../DB/models/review.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteReview= asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const deletedReview= await Review.findByIdAndDelete(id)
    if (!deletedReview) {
    return res.status(404).json({ message: "review not found" });

  }
    return res.status(200).json({
        message: "review deleted successfully",
       deletedReview
    })
})
export default deleteReview;