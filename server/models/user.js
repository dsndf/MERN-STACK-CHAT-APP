import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    password: {
        type: String,
        required: true,
        unique: true,
        select: false
    }
}, { timestamps: true });

console.log(mongoose.models);
export const user = new mongoose.model("User", userSchema);

