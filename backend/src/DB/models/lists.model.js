import mongoose ,{Schema , model} from "mongoose";

const listSchema= new Schema ({
    title:{
        type:String,
        required:true
    },
    boardId:{
        type: mongoose.Schema.Types.ObjectId,
         ref: "Board",
    }
},{timestamps:true})
const Lists= model('Lists' , listSchema)|| mongoose.models.Lists ;
export default Lists;