export const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";
  else if (fileExt === "mp3" || fileExt === "wav") return "audio";
  else if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};
export const transformImage = (url = "", width = 100) => {
  return url.replace("upload/", `upload/dpr_auto/w_${width}/`);
};

export const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getLast7days = () => {
  const currentDay = new Date().getDay(); //2
  const lastSeventhDay = currentDay === 6 ? 0 : currentDay + 1; // 3
  let days = [];
  for (let i = lastSeventhDay; i !== currentDay; i++) {
    days.push(WeekDays[i]);
    if (i === 6) {
      i = -1;
    } else if (i + 1 === currentDay) {
      days.push(WeekDays[currentDay]);
      break;
    }
  }
  return days;
};

export const getMessageSenderData = (chatMembers, sender) => {
  return chatMembers && chatMembers.find((member) => member._id === sender);
};
export const checkIsOnline = (onlineUsers = [], chatMembers = []) => {
  for (let user of onlineUsers) {
    if (chatMembers.includes(user)) return true;
  }
  return false;
};

export const limitString = (str = "", limit) => {
  if(str.length<=limit) return str; 
  return str.slice(0, limit)+"...";
};
