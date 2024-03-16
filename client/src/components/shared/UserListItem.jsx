import { Add, Remove } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { StyledAddFriendButton } from "../style/StyleComponent";
import { mainBg, removeColor } from "../../constants/color";

const UserListItem = ({ username, avatar, handler, accept = false }) => {
  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10rem",

      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar
          src={avatar && avatar}
          sx={{ width: "2.5rem", height: "2.5rem" }}
        />
        <ListItemText>
          <Typography variant="p" color="initial">
            {username}
          </Typography>
        </ListItemText>
      </Stack>
      <StyledAddFriendButton
        sx={{
          bgcolor: accept && removeColor,
          "&:hover": { bgcolor: accept ? removeColor : mainBg },
        }}
        onClick={handler}
        size="small"
      >
        {accept ? <Remove /> : <Add />}
      </StyledAddFriendButton>
    </ListItem>
  );
};

export default UserListItem;
