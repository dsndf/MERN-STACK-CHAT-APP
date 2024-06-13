import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import {
  headerBg,
  lightGrayBg,
  mainBg,
  onlineColor,
  selected,
} from "../../constants/color";
import { Handshake } from "@mui/icons-material";
import AvatarCard from "./AvatarCard";
import { StyledOnlineEffect } from "../style/StyleComponent";
import { useDialog } from "../../hooks/useDialog";
const CountBox = ({ value }) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      px={1}
      py={0.25}
      borderRadius={"100%"}
      component={"small"}
      color={"white"}
      bgcolor={mainBg}
    >
      {" "}
      {value}
    </Box>
  );
};

const ChatListItem = ({
  avatar,
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline = false,
  newMessage,
  handleDeleteChatOpen,
  isSelected = false,
  count = 0,
}) => {
  const leaveGroupMenu = useDialog(false);
  const deleteChat = useDialog(false);
  const singleChatRef = useRef(null);
  const groupChatRef = useRef(null);

  return (
    <Card
      variant="outlined"
      component={"div"}
      ref={groupChat ? groupChatRef : singleChatRef}
      onContextMenu={
        groupChat ? leaveGroupMenu.openHandler : deleteChat.openHandler
      }
      sx={{
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        border: "none",
        bgcolor: isSelected && selected,
        "&:hover": {
          bgcolor: !isSelected && "beige",
          transition: "all 0.5s",
        },
      }}
    >
      <CardHeader
        sx={{ ml: { xs: "0", md: "1rem" } }}
        title={name}
        subheader={count ? count + " New message" : ""}
        titleTypographyProps={{
          fontWeight: 500,
          color: isSelected ? "#fff" : "black",
          ml: "1rem",
          fontSize: "15px",
        }}
        subheaderTypographyProps={{ ml: 2, color: "green" }}
        avatar={<AvatarCard avatar={avatar} max={4} />}
        action={
          isOnline && (
            <Stack
              flexDirection={"row"}
              height={"100%"}
              alignItems={"center"}
              gap={"1rem"}
              mt={"1.5rem"}
              mr={1}
            >
              <Box
                width={"0.5rem"}
                height={"0.5rem"}
                borderRadius={"100%"}
                bgcolor={onlineColor}
                position={"relative"}
              >
                <StyledOnlineEffect />
              </Box>
            </Stack>
          )
        }
      />
      <Menu
        open={leaveGroupMenu.open}
        onClose={leaveGroupMenu.closeHandler}
        anchorEl={groupChatRef?.current}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuList disablePadding>
          <MenuItem sx={{ fontSize: "14px" }}>Leave Group</MenuItem>
        </MenuList>
      </Menu>
      <Menu
        open={deleteChat.open}
        onClose={deleteChat.closeHandler}
        anchorEl={singleChatRef?.current}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuList disablePadding>
          <MenuItem sx={{ fontSize: "14px", color: "red" }}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </Card>
  );
};

export default ChatListItem;
