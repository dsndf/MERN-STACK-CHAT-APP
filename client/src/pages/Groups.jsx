import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { lightGrayBg } from "../constants/color";
import { KeyboardBackspace, Menu, Group, Edit, Add } from "@mui/icons-material";
import { useDialog } from "../hooks/useDialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import GroupListItem from "../components/shared/GroupListItem";
import GroupList from "../components/specific/GroupList";
import { useInputValidation } from "6pp";
import { users } from "../constants/sampleData";
import UserListItem from "../components/shared/UserListItem";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialog/ConfirmDialog.jsx")
);

const Groups = () => {
  const drawer = useDialog({});
  const navigate = useNavigate();
  const groupName = useSearchParams()[0].get("group");
  const deleteGroupDialog = useDialog({});

  const [removedMembers, setRemovedMembers] = useState([]);
  const [isGroupNameEdit, setIsGroupNameEdit] = useState(false);
  const editGroupName = useInputValidation(groupName);

  const groupNameEditHandler = () => setIsGroupNameEdit(!isGroupNameEdit);

  const navigateBack = () => {
    navigate("/");
  };

  const removeMemberHandler = (id) => {
    console.log({ id });
    setRemovedMembers((prev) =>
      !prev.includes(id)
        ? [...prev, id]
        : prev.filter((member) => member !== id)
    );
  };

  useEffect(() => console.log({ removedMembers }), [removedMembers]);

  const GroupName = (
    <>
      <Box component={"div"} textAlign={"center"}>
        <Stack
          p={"1rem"}
          direction={"row"}
          justifyContent={"center"}
          spacing={4}
        >
          {isGroupNameEdit ? (
            <TextField
              variant="outlined"
              value={editGroupName.value}
              onChange={editGroupName.changeHandler}
            />
          ) : (
            <Typography variant="h4" color="initial">
              {groupName || "Group XYZ"}
            </Typography>
          )}

          <IconButton
            sx={{ height: "fit-content" }}
            onClick={groupNameEditHandler}
          >
            <Edit />
          </IconButton>
        </Stack>
      </Box>
    </>
  );

  const GroupMembersBox = (
    <Stack alignItems={"center"} mt={'2rem'}>
      <Box
        width={"25rem"}
        bgcolor={"white"}
        boxShadow={"0 0 5px #a19f9f"}
        p={"1rem"}
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        alignItems={"center"}
        borderRadius={"5px"}
      >
        <Stack alignItems={"center"}>
          {users &&
            users.map(({ _id, name, avatar }) => {
              return (
                <UserListItem
                  key={_id}
                  username={name}
                  avatar={avatar?.url}
                  accept={!removedMembers.includes(_id)}
                  handler={() => removeMemberHandler(_id)}
                />
              );
            })}
        </Stack>
        <Stack direction={"row"} spacing={"1rem"}>
          <Button
            variant="outlined"
            color="error"
            onClick={deleteGroupDialog.openHandler}
          >
            DELETE
          </Button>
          <Button startIcon={<Add />} variant="contained">
            ADD MEMBER
          </Button>
        </Stack>
      </Box>
    </Stack>
  );

  return (
    <Grid m={0} container height={"100vh"}>
      <Grid
        item
        display={{ xs: "none", sm: "block" }}
        sm={4}
        bgcolor={lightGrayBg}
      >
        <GroupList />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Box
          width={"100%"}
          position={"sticky"}
          top={0}
          p={"1rem"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <IconButton
            onClick={navigateBack}
            sx={{
              bgcolor: "#3f3f3f",
              transition: "all 0.5s",
              "&:hover": { bgcolor: "black" },
            }}
          >
            <KeyboardBackspace color="light" />
          </IconButton>
          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={drawer.openHandler}
          >
            <Menu />
          </IconButton>
        </Box>
        <Drawer open={drawer.open} onClose={drawer.closeHandler}>
          <List disablePadding>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText>Groups</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        {GroupName}
        {GroupMembersBox}
        <Suspense fallback={<h6>LOAIND</h6>}>
          {deleteGroupDialog.open && (
            <ConfirmDeleteDialog
              open={deleteGroupDialog.open}
              openHanlder={deleteGroupDialog.openHandler}
              closeHandler={deleteGroupDialog.closeHandler}
              title={"Delete Group"}
              content={"Are you sure you want to delete this group"}
            />
          )}
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default Groups;
