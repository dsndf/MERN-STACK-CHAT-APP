export const getOtherMembers = (members, me) => {
  return members.filter((member) => String(member) !== String(me));
};

export const getFileUrls = (fileListOfUrlAndPubId, fieldName) => {
  const list = fileListOfUrlAndPubId;
  if (fieldName === "avatar") {
    return list.map(({ avatar }) => avatar.url);
  } else return fileListOfUrlAndPubId.map((item) => item.url);
};
