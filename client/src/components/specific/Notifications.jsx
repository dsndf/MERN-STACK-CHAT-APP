import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Avatar, Box, DialogContent, Stack, Typography } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/query";
import { useMutation } from "../../hooks/useMutation";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementNotificationCount,
  resetNotificationCount,
  setIsNotified,
} from "../../redux/slices/userNotificationSlice";

const NotificationCard = ({ reqId, sender, handler }) => {
  return (
    <Box maxWidth={"400px"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          <Avatar
            sx={{ width: "2.5rem", height: "2.5rem" }}
            src={sender?.avatar?.url}
          />
          <Typography
            variant="p"
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {sender?.name} has sent you a friend request.
          </Typography>
        </Stack>
        <DialogActions>
          <Button
            color="primary"
            variant="text"
            onClick={() => {
              handler({ reqId, accepted: true });
            }}
          >
            AGREE
          </Button>
          <Button
            color="error"
            variant="text"
            onClick={() => {
              handler({ reqId, accepted: false });
            }}
          >
            DISAGREE
          </Button>
        </DialogActions>
      </Stack>
    </Box>
  );
};
const Notifications = ({ open, closeHandler }) => {
  // Get notification code start
  const notifications = useGetNotificationsQuery();
  // Get notification code end

  // handling notifiycount start
  const { isNotified, notifyCount } = useSelector(
    (state) => state.userNotification
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (notifyCount > 0) dispatch(resetNotificationCount());
    if (isNotified) {
      notifications.refetch();
      dispatch(setIsNotified(false));
    }
  }, [isNotified]);
  // hadnling notifiycount end

  // accept friend request code start
  const executeAcceptFriendRequestMutation = useMutation({
    hook: useAcceptFriendRequestMutation,
  });
  // accept friend request code end

  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby={"notification-dialog"}
    >
      <DialogTitle alignItems={"center"}>Notifications</DialogTitle>
      <DialogContent sx={{ width: "25rem" }}>
        {notifications.data &&
          notifications.data?.newNotifications?.map(({ sender, _id }) => {
            return (
              <NotificationCard
                key={_id}
                reqId={_id}
                handler={executeAcceptFriendRequestMutation}
                sender={sender}
              />
            );
          })}
        {!notifications.data?.newNotifications.length && (
          <Typography
            fontSize={"large"}
            color={"GrayText"}
            display={"flex"}
            alignItems={"center"}
          >
            <NotificationsIcon /> No Notifications Yet
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={closeHandler}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Notifications;
