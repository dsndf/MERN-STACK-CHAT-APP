import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
    content: {
        type: String
    },
    attachments: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

}, { timestamps: true });

export const message =  new mongoose.model("Message",messageSchema); 