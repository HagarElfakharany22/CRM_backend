import mongoose, { Schema, model } from "mongoose";

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    phone: String,
    company: String,
    status: {
        type: String,
        enum: ["new", "contacted", "qualified", "lost"],
        default: "new"
    },

    source: {
        type: String,
        enum: ["website", "facebook", "referral", "manual"],
        default: "manual"
    },

    // contacts: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Contact',
    //     },
    // ],
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true });
const Lead = model('leads', leadSchema) || mongoose.models.leads;
export default Lead;