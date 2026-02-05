import Review from "../../../DB/models/review.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

// addReview.service.js
const addReview = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const user = req.user._id;
  const id = req.params.id;
  const newReview = await Review.create({ content, user, taskId:id })
  return res.status(201).json({
    massage: "added review",
    newReview
  })
});

export default addReview;
