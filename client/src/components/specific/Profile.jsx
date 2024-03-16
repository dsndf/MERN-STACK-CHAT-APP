import { Avatar, Box, Stack, Typography } from "@mui/material";
import { AlternateEmail, Email, Person } from "@mui/icons-material";
import randomUser from "../../assets/random/chatIOUser.jpg";
import { profileContentColor, textColorInDark } from "../../constants/color";
import React from "react";

const ProfileCard = ({ title, content, icon }) => {
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      spacing={2}
      alignItems={"center"}
      justifyContent={"center"}
    >  {icon}
      <Stack spacing={1} alignItems={"center"}>
        <Typography
          variant="p"
          sx={{ color: textColorInDark }}
          component={"div"}
          display={"flex"}
          alignItems={"center"}
          gap={2}
        >
         {content}
        </Typography>
        <Typography
          variant="p"
          sx={{ color: profileContentColor,fontSize:"0.9rem" }}
        >
          {title}
        </Typography>
      </Stack>
    </Stack>
  );
};

const Profile = () => {
  return (
      <Stack
        height={"100%"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        spacing={"2rem"}
        padding={"3rem 1rem"}
      >
        <Stack alignItems={"center"} spacing={2}>
          <Avatar
            sx={{
              width: "110px",
              height: "110px",
              fontSize: "25px",
            }}
            src={randomUser}
          />

          <Typography variant="body1" sx={{ color: textColorInDark }}>
            My status is busy
          </Typography>
        </Stack>
        <ProfileCard
          title={"Username"}
          content={"@meAbhiSingh"}
          icon={
            <AlternateEmail fontSize="medium" sx={{ color: textColorInDark }} />
          }
        />
        <ProfileCard
          title={"Email"}
          content={"mernstack2999@gmail.com"}
          icon={<Email fontSize="medium" sx={{ color: textColorInDark }} />}
        />
        <ProfileCard
          title={"Name"}
          content={"gaurav jain"}
          icon={<Person fontSize="medium" sx={{ color: textColorInDark }} />}
        />
      </Stack>
  );
};

export default Profile;
