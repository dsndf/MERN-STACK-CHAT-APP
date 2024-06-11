import express from "express";
import { authentication } from "../middlewares/authentication";
import { deleteMessage } from "../controllers/message";

const messageRouter = express.Router();

messageRouter.use(authentication);
messageRouter.route("/delete/message/:id").delete(deleteMessage);
