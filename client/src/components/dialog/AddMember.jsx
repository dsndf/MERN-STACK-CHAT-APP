import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UserList from "../specific/UserList";
import { users } from "../../constants/sampleData";

const AddMember = ({ open, openHanlder, closeHandler, saveChangesAction }) => {
  const [selectedMembers, setSeletedMembers] = useState([]);
  const addGroupMemberHandler = (id) => {
    setSeletedMembers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((member) => member !== id);
      } else return [...prev, id];
    });
  };

  return (
    <Dialog open={open} onClose={closeHandler}>
      <Box p>
        <DialogTitle>Add Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let's have a new memebers into the group.
          </DialogContentText>
          <UserList
            users={users}
            handler={addGroupMemberHandler}
            selectedUsersList={selectedMembers}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="text" onClick={closeHandler}>
            CANCEL
          </Button>
          <Button variant="contained" onClick={saveChangesAction}>
            SAVE CHANGES
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddMember;
