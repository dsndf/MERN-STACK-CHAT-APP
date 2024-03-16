import styled from "@emotion/styled";
import { AppBar, Box, IconButton, Skeleton, Toolbar } from "@mui/material";
import React, { useState, lazy, Suspense } from "react";
import {
  Add,
  Logout,
  Notifications,
  People,
  Search,
  Telegram,
} from "@mui/icons-material";
import AppIconButton from "../shared/AppIconButton";
import NewGroup from "../specific/NewGroup.jsx";
import { useNavigate } from "react-router-dom";

const SearchBox = lazy(() => import("../specific/FindFriends.jsx"));
const NotificationsDialog = lazy(() => import("../specific/Notifications.jsx"));

const StyledAppBar = styled(AppBar)({
  position: "static",
});
const StyledToolBar = styled(Toolbar)({
  height: "4rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
});

const StyledLogoBox = styled(Box)({});

const StyledIconsBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  alignItems: "center",
});

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);
  const navigate = useNavigate();

  const openSearchHandler = () => {
    setIsSearch(!isSearch);
  };
  const openNewGroupHandler = () => {
    setIsNewGroup(true);
  };
  const openNotificaitons = () => {
    setIsNotifications(true);
  };
  const closeNotifications = () => {
    setIsNotifications(false);
  };

  const closeSearchHandler = () => {
    setIsSearch(false);
  };
  const closeNewGroupHandler = () => {
    setIsNewGroup(false);
  };
  const navigateToGroups = () => navigate("/groups");

  return (
    <Box>
      <StyledAppBar color="primary">
        <StyledToolBar>
          <StyledLogoBox>
            <IconButton
              size="large"
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Telegram /> chat.IO
            </IconButton>
          </StyledLogoBox>
          <StyledIconsBox>
            <AppIconButton
              title={"search"}
              icon={<Search />}
              onClick={openSearchHandler}
            />

            <AppIconButton
              title={"New Group"}
              icon={<Add />}
              onClick={openNewGroupHandler}
            />
            <AppIconButton
              title={"Notifications"}
              icon={<Notifications />}
              onClick={openNotificaitons}
            />
            <AppIconButton title={"Groups"} icon={<People />} onClick={navigateToGroups} />
            <AppIconButton title={"Logout"} icon={<Logout />} />
          </StyledIconsBox>
        </StyledToolBar>
      </StyledAppBar>

      {isSearch && (
        <Suspense fallback={<p>Find Friends...</p>}>
          <SearchBox open={isSearch} closeHandler={closeSearchHandler} />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<p>New Group...</p>}>
          <NewGroup open={isNewGroup} closeHandler={closeNewGroupHandler} />
        </Suspense>
      )}

      {isNotifications && (
        <Suspense fallback={<p>Notification</p>}>
          <NotificationsDialog
            open={isNotifications}
            closeHandler={closeNotifications}
          />
        </Suspense>
      )}
    </Box>
  );
};

export default Header;
