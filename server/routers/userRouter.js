import express from 'express';
import { singleAvatar } from '../middlewares/multer.js';
import { loginUser, signupUser , getMyProfile } from '../controllers/user.js';
import { authentication } from '../middlewares/authentication.js';

export const userRouter = express.Router();

userRouter.route('/signup').post(singleAvatar, signupUser);

userRouter.route('/login').post(loginUser);

userRouter.use(authentication);

userRouter.route('/profile').get(getMyProfile)

