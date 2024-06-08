import { Stack } from "@mui/material";
import React from "react";
import GroupListItem from "../shared/GroupListItem";
import { useDispatch } from "react-redux";
import { setSelectedGroup } from "../../redux/slices/miscSlice";
import { useNavigate } from "react-router-dom";

const GroupList = ({
  groupList = [
    { _id: "nasda" },
    { _id: "Dsadnbsa" },
    { _id: "Dsadnbsas" },
    { _id: "Dsadnbssa" },
  ],
  chatId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const groupClickHandler = (groupData) => {
    dispatch(setSelectedGroup({ group: groupData, isSelected: true }));
  };

  return (
    <Stack
      alignItems={"center"}
      spacing={2}
      p={"2rem"}
      height={"100vh"}
      sx={{ overflow: "auto" }}
      width={"100%"}
      border={"1px solid "}
    >
      {groupList &&
        groupList.map((group) => (
          <div
            style={{ width: "100%" }}
            onClick={() => {
              navigate("/groups?group=" + group?.name);
              groupClickHandler(group);
            }}
          >
            <GroupListItem
              key={group?._id}
              totalMembers={group?.totalMembers}
              group_name={group?.name}
              avatar={group?.avatar}
            />
          </div>
        ))}
    </Stack>
  );
};

export default GroupList;
