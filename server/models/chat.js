import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema({
    name: String,
    isGroup: {
        type: Boolean,
        default: false
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
    ,
    creator: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const chat = new mongoose.model("chat", chatSchema); 