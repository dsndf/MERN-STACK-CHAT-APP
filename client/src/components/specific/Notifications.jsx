import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { notifications } from "../../constants/sampleData";

const NotificationCard = ({ sender }) => {
  return (
    <Box maxWidth={"400px"} >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          <Avatar
            sx={{ width: "2.5rem", height: "2.5rem" }}
            src={sender?.avatar}
          />
          <Typography
            variant="p"
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
               WebkitLineClamp: 1,
               WebkitBoxOrient: "vertical",
               overflow: "hidden",
               textOverflow:"ellipsis",
               width:"100%",
            }}
          >
            {sender?.name} has sent you a friend request.
          </Typography>
        </Stack>
        <DialogActions>
          <Button color="primary" variant="text">
            AGREE
          </Button>
          <Button color="error" variant="text">
            DISAGREE
          </Button>
        </DialogActions>
      </Stack>
    </Box>
  );
};
const Notifications = ({ open, closeHandler }) => {
  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby={"notification-dialog"}
    >
      <DialogTitle alignItems={"center"}>Notifications</DialogTitle>
      <Stack spacing={"1rem"} p={"1rem"}>
        {notifications &&
          notifications.map(({ sender, _id }) => {
            return <NotificationCard key={_id} sender={sender} />;
          })}
      </Stack>
      <DialogActions>
        <Button color="error" onClick={closeHandler}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Notifications;
