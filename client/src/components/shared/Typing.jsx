import React from "react";
import { getUserAuth } from "../../redux/store";
import { Box, Typography } from "@mui/material";

const Typing = ({ sender }) => {
  const { user: me } = getUserAuth();
  const isMe = me?._id === sender?._id;
  return (
    <Box
      p={"10px"}
      bgcolor={"white"}
      width={"fit-content"}
      borderRadius={"0.5rem"}
    >
      <Typography variant="subtitle2">Typing...</Typography>
    </Box>
  );
};

export default Typing;
