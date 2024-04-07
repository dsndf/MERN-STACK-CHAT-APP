import { body, check} from "express-validator";

export const signupValidator = () => {
  return [
    body("username", "Please enter username").notEmpty(),
    body("name", "Please enter name").notEmpty(),
    body("password", "Please enter password").notEmpty(),
    body("bio", "Please enter bio").notEmpty(),
    check("avatar").notEmpty().withMessage("Avatar is not provided")
  ];
};

export const loginValidator = () => {
  return [
    body("username", "Please enter username").notEmpty(),
    body("password", "Please enter password").notEmpty(),
  ];
};

export const sendFriendRequestValidator = ()=>{
  return body('users',"Please provide users array").notEmpty().isArray({min:1}).withMessage("Please provide at least 1 user to send friend request.")
}
export const replyFriendRequestValidator = ()=>{
  return body('reply',"Please provide reply to the request").notEmpty();
}