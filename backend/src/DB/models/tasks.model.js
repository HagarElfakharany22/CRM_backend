import mongoose, { Schema, model } from "mongoose";

const taskSchema = new Schema({
    tite: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // image: {
    //     type: String,
    //     default: "",
    // },
    // linkReference: {
    //     type: String,
    //     default: "",
    // },
    status: {
        type: String,
        default: "In Progress"
    },
    deadline: {
        type: Date,
        required: true,
    }
},
{ timestamps: true })
const Tasks= model('Tasks' , taskSchema)|| mongoose.models.Tasks ;
export default Tasks;