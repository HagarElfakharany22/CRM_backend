import mongoose, { Schema, model } from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  company: String,
  title: String,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdFromLead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead"
  }

}, { timestamps: true });
const Contact = model('contacts', contactSchema) || mongoose.models.contacts;
export default Contact;