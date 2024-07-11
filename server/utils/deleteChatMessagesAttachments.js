import { deleteFromCloudinary } from "../lib/helper.js";
import { Message } from "../models/message.js";

export const deleteChatMessagesAttachments = async (chat_id) => {
  const messageAttachmentsList = await Message.find({ chat: chat_id }).select(
    "attachments"
  );
  console.log({ messageAttachmentsList });
  await deleteFromCloudinary(
    messageAttachmentsList.reduce((acc, v) => {
      console.log(v.attachments);
      let singleMessageAttachments = v.attachments.map(
        ({ public_id }) => public_id
      );
      console.log({ singleMessageAttachments });
      return [...acc, ...singleMessageAttachments];
    }, [])
  );

  console.log("ALL ATTACHMENTS HAS BEEN DELETED");
};
