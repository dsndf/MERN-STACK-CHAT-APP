import React, { memo } from "react";
import { Avatar, AvatarGroup, Stack, Typography } from "@mui/material";

import AvatarCard from "./AvatarCard";

const GroupListItem = ({ group_name, avatar, totalMembers,isActive}) => {
  return (
    
    <Stack
      direction={"row"}
      justifyContent={"flex-start"}
      spacing={4}
      alignItems={"center"}
      width={"100%"}
      p={"1rem"}
  
      bgcolor={!isActive?"lightgoldenrodyellow":"black"}
      sx={{ cursor: "pointer", transition:"all 0.5s" ,"&:hover":{
        bgcolor:!isActive && "#ededc3"
      } }}
      
    >
      <AvatarCard max={4} avatar={avatar} />
      <Stack>
        <Typography variant="body2" fontWeight={"600"} color={isActive?"white":"initial"}>
          {group_name?.slice(0,20)}{group_name?.length>20 && "..."} 
        </Typography>
        <Typography variant="caption" color={isActive?"white":"initial"}>
          {totalMembers} members
        </Typography>
      </Stack>
    </Stack>
  );
};

export default  memo(GroupListItem);
