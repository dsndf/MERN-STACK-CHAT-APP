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
export const transformImage = (url, pixel = 100) => {
  return url;
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
