import {
  Dialog,
  DialogActions,
  DialogContent,
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
      <DialogContent sx={{width:"20rem"}}>
        <UserListItemSkeleton />
        <UserListItemSkeleton />
        <UserListItemSkeleton />
        <UserListItemSkeleton />
        <UserListItemSkeleton />
      </DialogContent>
    </Dialog>
  );
};

export default FindFreindsSkeleton;
