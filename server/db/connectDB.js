import mongoose from "mongoose"

export const connectDB = (uri)=>{
 mongoose.connect(uri).then(()=>{
  console.log("MongoDB connected 😎");
 }).catch((err)=>console.log(err.message));
}
