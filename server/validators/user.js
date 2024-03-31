import { body} from "express-validator";

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
