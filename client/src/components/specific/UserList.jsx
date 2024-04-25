import { Box, List, Skeleton } from "@mui/material";
import React, { memo } from "react";
import UserListItem from "../shared/UserListItem";

const UserList = ({ users = [], handler , isFriendRequest=false}) => {
  let acceptUserList = users.map((user) => {
    return user?.sendStatus ? user._id : null;
  });
  return (
    <List disablePadding sx={{ mt: 2 }}>
      {users &&
        users.map((user) => {
          return (
            <UserListItem
              key={user?._id}
              username={user?.name}
              avatar={user?.avatar}
              onButtonClick={() => handler(user?._id)}
              accept={acceptUserList.includes(user?._id)}
              isFriendRequest = {isFriendRequest}
            />
          );
        })}
    </List>
  );
};

export default memo(UserList);
