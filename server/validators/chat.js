import { body, check, param, query } from "express-validator";

export const createGroupValidator = () => {
  return [
    body("members", "Please provide members")
      .notEmpty()
      .isArray({ min: 3 })
      .withMessage("Please provide at least 3 members"),
    body("name").notEmpty().withMessage("Please provide group name"),
  ];
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

export const sendMessageValidator = () => {
  return [
    chatIdValidator(),
    body("content", "Please provide content").notEmpty(),
  ];
};
export const sendAttachmentsValidator = () => {
  return [
    chatIdValidator(),
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
