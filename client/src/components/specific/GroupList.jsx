import { Stack } from "@mui/material";
import React from "react";
import GroupListItem from "../shared/GroupListItem";

const GroupList = ({
  groupList = [{ _id: "nasda" }, { _id: "Dsadnbsa" }
  , { _id: "Dsadnbsas" }
  , { _id: "Dsadnbssa" }

],
  chatId,
}) => {
  return (
    <Stack alignItems={"center"} spacing={2} p={"2rem"}>
      {groupList && groupList.map(({ _id }) => <GroupListItem key={_id} />)}
    </Stack>
  );
};

export default GroupList;
