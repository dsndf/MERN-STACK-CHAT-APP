import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    bio: {
        type: String,
        required: true
    },
    avatar: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        }
    },
    password: {
        type: String,
        required: true,
        unique: true,
        select: false
    },
    chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
    friends:[{type:Schema.Types.ObjectId,ref:'User'}]
}, { timestamps: true });

console.log(mongoose.models);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 10);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    const _id = this._id;
    const authToken = jwt.sign({ _id }, process.env.SECRET_KEY);
    return authToken;
}


export const User = new mongoose.model("User", userSchema);


