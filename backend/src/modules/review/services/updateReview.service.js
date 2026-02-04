import Review from "../../../DB/models/review.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const updateReview= asyncHandler(async (req,res,next)=>{
     const {id}=req.params;
    
    const { content } = req.body;
      const updatedData = {
    content
  };

    const updatedReview= await Review.findByIdAndUpdate(id , updatedData , { new: true, runValidators: true })
    if (!updatedReview) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.status(200).json({
    message: "review updated successfully",
    updatedReview
  });

})
export default updateReview;