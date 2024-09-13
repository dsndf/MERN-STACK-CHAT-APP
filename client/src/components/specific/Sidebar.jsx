import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Dashboard,
  Forum,
  Group,
  Logout,
  ManageAccounts,
  Message,
  Style,
} from "@mui/icons-material";
import { darkBlue } from "../../constants/color";
import { StyledLink } from "../style/StyleComponent";
import { adminLogout } from "../../redux/thunk/adminAuth";

const tabs = [
  {
    name: "Dashboard",
    icon: <Dashboard />,
    path: "/admin/dashboard",
  },
  {
    name: "Users",
    icon: <ManageAccounts />,
    path: "/admin/users-management",
  },
  {
    name: "Chats",
    icon: <Forum />,
    path: "/admin/chats",
  },
  {
    name: "Messages",
    icon: <Message />,
    path: "/admin/messages",
  },
  {
    name: "Logout",
    logutHandler: (cb) => cb(),
    icon: <Logout />,
  },
];

const TabOption = ({ title, icon, style }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      gap={"1rem"}
      alignItems={"center"}
      borderRadius={"30px"}
      p={"1rem"}
      width={"100%"}
      sx={{
        color: !style && darkBlue,
        transition: "all 0.5s",
        "&:hover": !style && {
          backgroundColor: "#ebf6ff",
        },
        ...style,
      }}
    >
      {icon}
      <Typography variant="h6" sx={{ fontSize: "15px" }}>
        {title}
      </Typography>
    </Box>
  );
};

const Sidebar = ({ style }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Stack
      spacing={4}
      alignItems={"center"}
      px={"2rem"}
      pt={"2rem"}
      height={"100%"}
      {...style}
    >
      <Stack
        width={"100%"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <TelegramIcon fontSize="large" color={"secondary"} />
        <Typography
          color={"secondary"}
          textAlign={"left"}
          variant="h4"
          fontWeight={"500"}
        >
          Chatify
        </Typography>
      </Stack>
      <Stack width={"100%"} spacing={2}>
        {tabs &&
          tabs.map((tab) => (
            <StyledLink
              to={tab?.path}
              onClick={
                tab?.name === "Logout"
                  ? () => tab?.logutHandler(() => dispatch(adminLogout()))
                  : null
              }
            >
              <TabOption
                title={tab?.name}
                icon={tab?.icon}
                style={
                  location.pathname === tab?.path && {
                    bgcolor: darkBlue,
                    color: "#fff",
                  }
                }
              />
            </StyledLink>
          ))}
      </Stack>
    </Stack>
  );
};

export default Sidebar;
