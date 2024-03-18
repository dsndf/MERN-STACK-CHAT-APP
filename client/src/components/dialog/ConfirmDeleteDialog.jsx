import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import React from "react";

const ConfirmDeleteDialog = ({
  open,
  openHanlder,
  closeHandler,
  content,
  title,
  deleteAction,
}) => {


  return (
    <Dialog open={open} onClose={closeHandler}>
      <Box p>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText color={"black"}>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="error" onClick={closeHandler}>
            CANCEL
          </Button>
          <Button variant="contained" color="primary" onClick={deleteAction} >
            DELETE
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
