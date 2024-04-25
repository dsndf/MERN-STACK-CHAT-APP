import { body, buildCheckFunction, check, cookie } from "express-validator";

export const signupValidator = () => {
  return [
    body("username", "Please enter username").notEmpty(),
    body("name", "Please enter name").notEmpty(),
    body("password", "Please enter password").notEmpty(),
    body("bio", "Please enter bio").notEmpty(),
  ];
};

export const loginValidator = () => {
  return [
    body("username", "Please enter username").notEmpty(),
    body("password", "Please enter password").notEmpty(),
  ];
};

export const sendFriendRequestValidator = () => {
  return body("userId").isMongoId().withMessage("Please provide valid userId");
};
export const replyFriendRequestValidator = () => {
  return body("reply", "Please provide reply to the request").notEmpty();
};

export const validateAdminLogin = () => {
  return body("passkey", "Admin pass key is required").notEmpty();
};
export const checkAdminAuthorization = (field) => {
  return (value, { req }) => {
    console.log(req.body[field]);
    return true;
  };
};
