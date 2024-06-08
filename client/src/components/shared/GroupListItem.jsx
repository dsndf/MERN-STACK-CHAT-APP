import React from "react";
import { Avatar, AvatarGroup, Stack, Typography } from "@mui/material";
import randomUser from "../../assets/random/chatIOUser.jpg";
import AvatarCard from "./AvatarCard";

const GroupListItem = ({ group_name, avatar, totalMembers}) => {
  return (
    
    <Stack
      direction={"row"}
      justifyContent={"flex-start"}
      spacing={4}
      alignItems={"center"}
      width={"100%"}
      p={"1rem"}
      bgcolor={"white"}
      boxShadow={"0 0 5px #a19f9f"}
      borderRadius={"5px"}
      sx={{ cursor: "pointer" }}
    >
      <AvatarCard max={4} avatar={avatar} />
      <Stack>
        <Typography variant="body2" fontWeight={"600"} color="initial">
          {group_name}
        </Typography>
        <Typography variant="caption" color="initial">
          {totalMembers} members
        </Typography>
      </Stack>
    </Stack>
  );
};

export default GroupListItem;
