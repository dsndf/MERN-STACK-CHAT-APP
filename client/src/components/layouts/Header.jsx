import styled from "@emotion/styled";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  Skeleton,
  Toolbar,
} from "@mui/material";
import React, { useState, lazy, Suspense, useCallback } from "react";
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
import { useDispatchAndSelector } from "../../hooks/useDispatchAndSelector.js";
import { logout } from "../../redux/slices/authSlice.js";
import FindFreindsSkeleton from "../skeleton/FindFreindsSkeleton.jsx";
import toast from "react-hot-toast";
import { useAddEvents } from "../../hooks/useAddEvents.js";
import { NOTIFICATION_ALERT } from "../../events/clientEvents.js";
import { useSelector } from "react-redux";
import {
  incrementNotificationCount,
  setIsNotified,
  setNotifications,
} from "../../redux/slices/userNotificationSlice.js";

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

const Header = ({ drawerOpenHandler }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);
  const { notifyCount } = useSelector((state) => state.userNotification);

  const navigate = useNavigate();
  const {
    dispatch,
    state: { loading },
  } = useDispatchAndSelector("auth");
  const notificationAlert = useCallback(() => {
    if (isNotifications) return dispatch(setIsNotified(true));
    dispatch(incrementNotificationCount());
  }, [isNotifications]);
  useAddEvents(
    [{ event: NOTIFICATION_ALERT, eventHandler: notificationAlert }],
    { dependencies: [isNotifications] }
  );
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
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box>
      <StyledAppBar color="primary">
        <StyledToolBar>
          <StyledLogoBox>
            <IconButton
              aria-label="chats-menu"
              onClick={drawerOpenHandler}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
            >
              <Telegram />
            </IconButton>
            <IconButton
              size="large"
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <Telegram /> Chattu
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
              icon={
                <Badge badgeContent={notifyCount} color="secondary">
                  <Notifications />
                </Badge>
              }
              onClick={openNotificaitons}
            />
            <AppIconButton
              title={"Groups"}
              icon={<People />}
              onClick={navigateToGroups}
            />
            <AppIconButton
              title={"Logout"}
              icon={<Logout />}
              onClick={logoutHandler}
            />
          </StyledIconsBox>
        </StyledToolBar>
        {loading && <LinearProgress sx={{ width: "100%" }} color="secondary" />}
      </StyledAppBar>

      {isSearch && (
        <Suspense fallback={<FindFreindsSkeleton />}>
          <SearchBox open={isSearch} closeHandler={closeSearchHandler} />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<FindFreindsSkeleton />}>
          <NewGroup open={isNewGroup} closeHandler={closeNewGroupHandler} />
        </Suspense>
      )}

      {isNotifications && (
        <Suspense fallback={<FindFreindsSkeleton />}>
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
