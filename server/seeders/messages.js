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
      sender: new Types.ObjectId("6603949bbd873a6ef2fdbd0c"),
      content: faker.animal.bird(),
      attachments: createAttachments(0),
      chat: "661285de4c8598d88fc353b8",
    });
  }
  await Message.insertMany(messages);
  console.log("Messages created ✔");
  process.exit(0);
};
