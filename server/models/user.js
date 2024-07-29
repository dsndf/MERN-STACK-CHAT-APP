import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    password: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const _id = this._id;
  const authToken = jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: `${process.env.TOKEN_EXPIRY} days`,
  });
  return authToken;
};

export const User =
  mongoose.models.User || new mongoose.model("User", userSchema);
