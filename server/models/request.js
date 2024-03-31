import mongoose, { Schema } from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reciever: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Denied"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Request = mongoose.models.Request || new mongoose.model("Request", requestSchema);
