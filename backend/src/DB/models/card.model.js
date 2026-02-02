import mongoose, { Schema, model } from "mongoose";

const cardSchema = new Schema({
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lists",
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
    },
    attachments: [
        {
            fileName: String,
            fileUrl: String,
            uploadedAt: Date
        }
    ]

}, { timestamps: true })
const Card = model('Card', cardSchema) || mongoose.models.Card;
export default Card;