import { body, check, param, query } from "express-validator";

export const createGroupValidator = () => {
  return [body("members", "Please provide members").notEmpty()];
};

export const addMembersValidator = () => {
  return [
    body("members", "Please provide members")
      .notEmpty()
      .isArray({ min: 1 })
      .withMessage("Please provide at least 1 member to be added"),
    body("chat_id")
      .notEmpty()
      .withMessage("Please provide particular group chat id"),
  ];
};

export const removeMemberValidator = () => {
  return [
    body("member", "Please provide member")
      .isMongoId()
      .withMessage("Please provide valid member id"),
    body("chat_id")
      .isMongoId()
      .withMessage("Please provide valid group chat id"),
  ];
};

export const sendAttachmentsValidator = () => {
  return [
    param("chat_id", "Please provide valid chat id").isMongoId(),
    check("files", "Please provide files")
      .optional()
      .isArray({ max: 5 })
      .withMessage("You can send only upto 5 files at a time"),
  ];
};

export const chatIdValidator = () => {
  return param("chat_id")
    .isMongoId()
    .withMessage("Please provide valid chat id");
};

export const editGroupNameValidator = () => {
  return [
    body("name", "Please enter the name for edit").notEmpty(),
    chatIdValidator(),
  ];
};
