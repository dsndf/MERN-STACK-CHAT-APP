import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
} from "@mui/material";
import React from "react";

const ConfirmDialogSkeleton = () => {
  return (
    <Dialog open>
      <DialogTitle>
        <Skeleton variant="text" width={"40%"} />
      </DialogTitle>
      <DialogContent sx={{ maxWidth: "23rem" , minWidth:"20rem" }}>
        <DialogContentText>
          <Skeleton variant="text" width={"100%"} />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{px:"1rem"}}>
        <Skeleton variant="rectangular" width={"4rem"} height={"2.5rem"} />
        <Skeleton variant="rectangular" width={"4rem"} height={"2.5rem"} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialogSkeleton;
