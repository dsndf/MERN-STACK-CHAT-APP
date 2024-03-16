import { useInputValidation } from "6pp";
import { Search } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import UserList from "./UserList";
import { users } from "../../constants/sampleData";

const FindFriends = ({ open, closeHandler }) => {
  const searchFriend = useInputValidation("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const sendFriendRequestHandler = (id) => {};
  return (
    <Dialog open={open}>
      <Stack p={"1rem"}>
        <DialogTitle textAlign={"center"}>Find Friends</DialogTitle>
        <TextField
          variant="outlined" 
          type="text"
          size="small"
          value={searchFriend.value}
          onChange={searchFriend.changeHandler}
          placeholder="Search new friends here"
      
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <UserList
          users={users}
          selectedUsersList={selectedUsers}
          handler={sendFriendRequestHandler}
        />
        <DialogActions>
          <Button onClick={closeHandler}>Close</Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default FindFriends;
