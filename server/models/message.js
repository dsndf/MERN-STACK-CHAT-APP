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
   chat:{
    type:Schema.Types.ObjectId,
    required:true
   }
}, { timestamps: true });

export const Message =  new mongoose.model("Message",messageSchema); 