import mongoose, { Schema, model } from "mongoose";

const dealSchema = new mongoose.Schema({
  name: { type: String, required: true },

  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact"
  },

  value: {
    type: Number,
    required: true
  },

  stage: {
    type: String,
    enum: ["prospecting", "proposal", "negotiation", "won", "lost"],
    default: "prospecting"
  },

  probability: {
    type: Number,
    min: 0,
    max: 100
  },

  expectedCloseDate: Date,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });
const Deal = model('deals', dealSchema) || mongoose.models.deals;
export default Deal;