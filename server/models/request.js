import mongoose, { Schema } from "mongoose";

const requestSchema = new mongoose.Schema({
 sender:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:"User"
 },
 reciever:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:"User"
 },

 status:{
    type:String,
    enum:["Pending","Accepted"],
    default:"Pending"
 },
 
 
}, { timestamps: true });

export const request =  new mongoose.model("request",requestSchema); 