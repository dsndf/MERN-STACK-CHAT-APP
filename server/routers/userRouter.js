import express from 'express';
import { singleAvatar } from '../middlewares/multer';
import { signupUser } from '../controllers/user';

export const userRouter = express.Router();

userRouter.route('/user/signup').post(singleAvatar,signupUser);
