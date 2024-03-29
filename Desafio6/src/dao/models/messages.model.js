import  { Schema, model } from "mongoose";  

const messagesSchema = Schema({
    user: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const messageModel = model('Messages', messagesSchema);
