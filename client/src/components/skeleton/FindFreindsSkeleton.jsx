import {
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  Skeleton,
} from "@mui/material";
import React from "react";
import UserListItemSkeleton from "./UserListItemSkeleton";

const FindFreindsSkeleton = () => {
  return (
    <Dialog open>
      <DialogTitle>
        <Skeleton variant="text" width={100} />
      </DialogTitle>
      <Skeleton variant="rectangle" width={"100%"} />
      <UserListItemSkeleton />
      <UserListItemSkeleton />
      <UserListItemSkeleton />
      <DialogActions>
        <Skeleton variant="rectangular" width={"1rem"} height={"1rem"} />
      </DialogActions>
    </Dialog>
  );
};

export default FindFreindsSkeleton;
