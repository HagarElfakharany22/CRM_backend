import {Schema} from "mongoose";

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
   cardId: {
    type: Schema.Types.ObjectId,
    ref: "Card",
    required: true,
  },
  content:{
    type:String,
    default:""
  }
 
},{timestamps:true})
const Review= model('Review' , reviewSchema)|| mongoose.models.Review ;

export default Review
