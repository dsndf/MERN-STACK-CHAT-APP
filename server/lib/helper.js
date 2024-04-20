import cloudinary from  'cloudinary';
import dataUriparser from  'datauri/parser.js';
export const getOtherMembers = (members, me) => {
  return members.filter((member) => String(member) !== String(me));
};

export const getFileUrls = (fileListOfUrlAndPubId, fieldName) => {
  const list = fileListOfUrlAndPubId;
  if (fieldName === "avatar") {
    return list.map(({ avatar }) => avatar.url);
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
    console.log({clientData});
    eventHandler(clientData);
  });
};
export const cloudinaryInstance = cloudinary;
export const getDataUri = async (file)=>{
  const parser = new dataUriparser();
  console.log(file.originalname);
  return parser.format(file.originalname.split('.')[0],file.buffer);
}