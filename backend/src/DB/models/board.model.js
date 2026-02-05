import mongoose ,{Schema , model} from "mongoose";

const boardSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    users:[{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }]
},
    { timestamps: true })
    const Board= model('Board' , boardSchema)|| mongoose.models.Board ;
    export default Board;