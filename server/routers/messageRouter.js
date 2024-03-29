import express from 'express';
import { authentication } from '../middlewares/authentication';

const messageRouter = express.Router();

messageRouter.use(authentication);

messageRouter.route('/delete/message/:id').delete(deleteMessage)