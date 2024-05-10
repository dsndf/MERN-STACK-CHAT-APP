import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const GroupNameDialog = ({ open, onClose }) => {
  const [groupName, setGroupName] = useState("");
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Group Name</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="secondary">
          CANCEL
        </Button>
        <Button variant="contained" onClick={onClose}>
          CREATE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupNameDialog;
