import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { Message } from "../models/message.js";

export const createAttachments = (numofAttachments) => {
  let attachments = [];
  for (let i = 0; i < numofAttachments; i++) {
    attachments.push({
      public_id: faker.system.fileName(),
      url: i == 2 ? faker.music.genre() : faker.image.url(),
    });
  }
  return attachments;
};

export const createMessages = async (numofMessages) => {
  let messages = [];

  for (let i = 0; i < numofMessages; i++) {
    messages.push({
      sender: new Types.ObjectId(),
      content: faker.string.sample({ max: 10 }),
      attachments: createAttachments(0),
      chat: "66128a1dbc2193fe89ab46ad",
    });
  }
  await Message.insertMany(messages);
  console.log("Messages created ✔");
  process.exit(0);
};
