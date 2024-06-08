import { Avatar, Box, Stack, Typography } from "@mui/material";
import { AlternateEmail, Email, Person } from "@mui/icons-material";
import randomUser from "../../assets/random/chatIOUser.jpg";
import { profileContentColor, textColorInDark } from "../../constants/color";
import { useSelector } from "react-redux";

const ProfileCard = ({ title, content, icon }) => {
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      spacing={2}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {" "}
      {icon}
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
          sx={{ color: profileContentColor, fontSize: "0.9rem" }}
        >
          {title}
        </Typography>
      </Stack>
    </Stack>
  );
};

const Profile = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
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
            padding: "1px",
            width: "13rem",
            height: "13rem",
            border: "2px solid white",
          }}
          src={user?.avatar?.url}
        />
        <Typography variant="h6" color={"white"}>
          {"Gaurav Jain"}
        </Typography>
        {isAuth && "Online"}
      </Stack>
    </Stack>
  );
};

export default Profile;
