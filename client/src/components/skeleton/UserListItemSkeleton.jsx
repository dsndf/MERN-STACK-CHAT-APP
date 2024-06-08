import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";
import React from "react";
import { avatarStyling } from "../../constants/color";


const UserListItemSkeleton = () => {
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{gap:"1rem"}}>
        <ListItemAvatar >
          <Skeleton variant="circular"sx={{...avatarStyling}} />
        </ListItemAvatar>
        <ListItemText><Skeleton variant="text" width={"100%"} /></ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default UserListItemSkeleton;
