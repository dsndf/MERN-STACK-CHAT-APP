import React from "react";
import { Avatar, AvatarGroup, Stack, Typography } from "@mui/material";
import randomUser from '../../assets/random/chatIOUser.jpg';

const GroupListItem = ({ chatId, group_id, group_name, avatar }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"flex-start"}
      spacing={2}
      alignItems={"flex-start"}
      width={'350px'}
      p={'0.5rem'}
      bgcolor={"white"}
      boxShadow={'0 0 5px #a19f9f'}
       borderRadius={'5px'}
    >
      <AvatarGroup max={3}>
        <Avatar src={randomUser} />
        <Avatar src={randomUser} />
        <Avatar src={randomUser} />
        <Avatar src={randomUser} />
   
      </AvatarGroup>
      <Stack>
        <Typography variant="p" fontWeight={'600'} color="initial" >6 Pack Warriros</Typography>
        <Typography variant="caption" color="initial" >This is caption</Typography>
      </Stack>
    </Stack>
  );
};

export default GroupListItem;
