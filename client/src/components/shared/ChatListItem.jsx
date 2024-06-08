import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { headerBg, mainBg, onlineColor, selected } from "../../constants/color";
import { Handshake } from "@mui/icons-material";
import AvatarCard from "./AvatarCard";
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
  return (
    <Card variant="outlined" sx={{ bgcolor: isSelected && selected }}>
      <CardHeader
        sx={{ ml: "1rem" }}
        title={name}
        subheader={count ? count + " New message" : ""}
        titleTypographyProps={{
          fontWeight: 500,
          color: isSelected ? "#fff" : "black",
          ml: "1rem",
          fontSize: "15px",
        }}
        subheaderTypographyProps={{ ml:2 ,color:"green"}}
        avatar={<AvatarCard max={2} avatar={avatar} />}
        action={
          isOnline && (
            <Stack
              flexDirection={"row"}
              height={"100%"}
              alignItems={"center"}
              gap={"1rem"}
              mt={2.5}
            >
              <Box
                width={"0.5rem"}
                height={"0.5rem"}
                borderRadius={"100%"}
                bgcolor={onlineColor}
              ></Box>
            </Stack>
          )
        }
      />
    </Card>
  );
};

export default ChatListItem;
