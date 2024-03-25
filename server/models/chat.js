import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema({
    name: String,
    isGroup: {
        type: Boolean,
        default: false
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
    ,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    }
}, { timestamps: true });

export const Chat = new mongoose.model("Chat", chatSchema); 