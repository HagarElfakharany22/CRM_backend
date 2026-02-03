import mongoose ,{Schema , model} from "mongoose";

const departmentSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    leadrId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    usersDepartment:[
        {
          type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        }
    ]

})
const Department =model('Department' , taskSchema)|| mongoose.models.Department ;
export default Department;