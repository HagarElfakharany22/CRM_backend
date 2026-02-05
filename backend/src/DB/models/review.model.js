import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    // required: true,
  },
   taskId: {
    type: Schema.Types.ObjectId,
    ref: "Tasks",
    // required: true,
  },
  content:{
    type:String,
    default:""
  }
 
},{timestamps:true})
const Review= model('Review' , reviewSchema)|| mongoose.models.Review ;

export default Review
