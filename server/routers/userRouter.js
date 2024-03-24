import express from 'express';
import { singleAvatar } from '../middlewares/multer.js';
import { loginUser, signupUser } from '../controllers/user.js';

export const userRouter = express.Router();

userRouter.route('/user/signup').post(singleAvatar, signupUser);
userRouter.route('/user/login').post(loginUser);
