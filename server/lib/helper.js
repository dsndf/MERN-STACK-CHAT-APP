import cloudinary from "cloudinary";
import dataUriparser from "datauri/parser.js";
import { usersSocket } from "../server.js";
export const getOtherMembers = (members, me, isPopulated = false) => {
  return members.filter((member) => {
    if (isPopulated) {
      return String(member._id) !== String(me);
    } else return String(member) !== String(me);
  });
};

export const getFileUrls = (fileListOfUrlAndPubId, fieldName) => {
  const list = fileListOfUrlAndPubId;
  if (fieldName === "avatar") {
    return list.map(({ avatar }) => avatar);
  } else return fileListOfUrlAndPubId.map((item) => item.url);
};

export const emitSocketEvent = (
  socket,
  EVENT_NAME,
  data,
  { singleUser = false, multipleUser = false, socketsId = [] }
) => {
  console.log(socketsId);
  if (!singleUser && !multipleUser) socket.emit(EVENT_NAME, data);
  else if (singleUser) socket.to(socketsId[0]).emit(EVENT_NAME, data);
  else socket.to(socketsId).emit(EVENT_NAME, data);
};
export const listenSocketEvent = (socket, EVENT_NAME, eventHandler) => {
  socket.on(EVENT_NAME, (clientData) => {
    // clientData = JSON.parse(clientData);
    console.log({ clientData });
    eventHandler(clientData);
  });
};
export const cloudinaryInstance = cloudinary;
export const getDataUri = (file) => {
  const parser = new dataUriparser();
  console.log(file.originalname);
  return parser.format(file.originalname.split(".")[0], file.buffer);
};
export const isFriendOnline = (friends, isPopulated = false) => {
  for (let i of friends) {
    if (!isPopulated && usersSocket.get(String(i))) return true;
    else if (isPopulated && usersSocket.get(String(i?._id))) return true;
  }
  return false;
};

export const getSockets = (users) => {
  const friendsockets = [];
  for (let i of users) {
    const isSocketExist = usersSocket.get(String(i));
    if (isSocketExist) friendsockets.push(isSocketExist);
  }
  return friendsockets;
};
