import mongoose, { Schema, model } from "mongoose";

const assignedTasksListSchema = new Schema({
    title: {
        type: String,
        default: "Assigned Tasks",
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",

    },
    tasks: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks"
    }]
},
    { timestamps: true })
const AssignedTasksList = model('AssignedTasksList', assignedTasksListSchema) || mongoose.models.AssignedTasksList;
export default AssignedTasksList;