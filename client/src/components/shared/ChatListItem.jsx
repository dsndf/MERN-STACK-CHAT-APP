import { Avatar, AvatarGroup, Box, Card, CardHeader } from "@mui/material";
import React from "react";
import { headerBg, mainBg, onlineColor, selected } from "../../constants/color";
import { Handshake } from "@mui/icons-material";

const ChatListItem = ({
  avatar = [1, 2, 4, 5, 6],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessage,
  index = 0,
  handleDeleteChatOpen,
  isSelected = false,
}) => {
  return (
    <Card variant="outlined" sx={{ bgcolor: isSelected && selected }}>
      <CardHeader
        title={name}
        subheader="Last message."
        titleTypographyProps={{ fontWeight: 600 }}
        avatar={
          <Box width={80}>
            <AvatarGroup max={2}>
              {avatar &&
                avatar.map((av, i) => {
                  return (
                    <Avatar
                      key={av?.public_id}
                      src={av?. url}
                    />
                  );
                })}
            </AvatarGroup>
          </Box>
        }
        action={
          <Box
            mt={"1.2rem"}
            width={"0.5rem"}
            height={"0.5rem"}
            borderRadius={"100%"}
            bgcolor={onlineColor}
          ></Box>
        }
      />
    </Card>
  );
};

export default ChatListItem;
