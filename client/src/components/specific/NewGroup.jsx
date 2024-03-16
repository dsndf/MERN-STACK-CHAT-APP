import {
  Dialog,
  DialogActions,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import { users } from "../../constants/sampleData";
import { Search } from "@mui/icons-material";
 
const NewGroup = ({ open, closeHandler }) => {
  const [selectedMembers, setSeletedMembers] = useState([]);
  const selectGroupMemberHandler = (id) => {
    setSeletedMembers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((member) => member !== id);
      } else return [...prev, id];
    });
  };
  useEffect(() => {
    console.log(selectedMembers);
  }, [selectedMembers]);

  return (
    <Dialog open={open}>
      <Stack p={ "1rem"} >
        <DialogTitle textAlign={"center"}>New Group</DialogTitle>
        <TextField
          placeholder="Search people here."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Stack>
          <UserList
            users={users}
            handler={selectGroupMemberHandler}
            selectedUsersList={selectedMembers}
          />
        </Stack>{" "}
        <DialogActions>
          <Button variant="text" color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Done
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
