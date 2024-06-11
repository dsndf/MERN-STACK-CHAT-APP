import { Avatar, Box, Stack, Typography } from "@mui/material";
import { AccountCircle, AlternateEmail, Email, Fingerprint, Person } from "@mui/icons-material";
import randomUser from "../../assets/random/chatIOUser.jpg";
import { profileContentColor, textColorInDark } from "../../constants/color";
import { useSelector } from "react-redux";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
const ProfileCard = ({ title, content, Icon }) => {
  const iconProps = {
    sx: {
      color: "beige",
    },
  };
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      spacing={2}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {" "}
      <Icon {...iconProps} />
      <Stack spacing={1} alignItems={"center"}>
        <Typography
          variant="p"
          sx={{ color: textColorInDark }}
          component={"div"}
          gap={2}
          fontWeight={400}
          fontSize={"large"}
          textAlign={"center"}
        >
          {content.slice(0,20)}
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
      </Stack>
      <ProfileCard
        Icon={Fingerprint}
        title={"Bio"}
        content={user?.bio}
      />
      <ProfileCard
        Icon={SentimentSatisfiedAltIcon}
        title={"Name"}
        content={user?.name}
      />
      <ProfileCard
        Icon={AccountCircle}
        title={"Username"}
        content={user?.username}
      />
   
    </Stack>
  );
};

export default Profile;
