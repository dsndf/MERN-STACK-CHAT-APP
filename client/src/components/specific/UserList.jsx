import { List } from "@mui/material";
import React, { memo } from "react";
import UserListItem from "../shared/UserListItem";

const UserList = ({ users, handler ,selectedUsersList }) => {
  return (
    <List>
      {users &&
        users.map((user) => {
          return (
            <UserListItem
              key={user?._id}
              username={user?.name}
              avatar={user?.avatar}
              handler={() => handler(user?._id)}
              accept={selectedUsersList.includes(user?._id)}
            />
          );
        })}
    </List>
  );
};

export default memo(UserList);
