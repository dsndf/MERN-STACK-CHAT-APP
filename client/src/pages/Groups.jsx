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
import {
  KeyboardBackspace,
  Menu,
  Group,
  Edit,
  Add,
  People,
  Close,
} from "@mui/icons-material";
import { useDialog } from "../hooks/useDialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import GroupListItem from "../components/shared/GroupListItem";
import GroupList from "../components/specific/GroupList";
import { useInputValidation } from "6pp";
import { users } from "../constants/sampleData";
import UserListItem from "../components/shared/UserListItem";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialog/ConfirmDeleteDialog.jsx")
);
const AddGroupMemberDialog = lazy(() =>
  import("../components/dialog/AddMember.jsx")
);

const Groups = () => {
  const drawer = useDialog({});
  const navigate = useNavigate();
  const groupName = useSearchParams()[0].get("group");
  const deleteGroupDialog = useDialog({});
  const addGroupMemberDialog = useDialog({});

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

  const deleteGroupHandler = () => {
    deleteGroupDialog.closeHandler();
  };
  const addGroupMemberSaveChangesHandler = () => {
    addGroupMemberDialog.closeHandler();
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
    <Stack alignItems={"center"} mt={"2rem"}>
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
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={addGroupMemberDialog.openHandler}
          >
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
        display={{ xs: "none", md: "block" }}
        md={4}
        bgcolor={lightGrayBg}
      >
        <GroupList />
      </Grid>
      <Grid item xs={12} md={8}>
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
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={drawer.openHandler}
          >
            {drawer.open ? <Close /> : <Menu />}
          </IconButton>
        </Box>
        <Drawer open={drawer.open} onClose={drawer.closeHandler}>
          <GroupList />
        </Drawer>
        {GroupName}
        <Typography
          variant="h6"
          color="initial"
          display={"flex"}
          alignItems={"center"}
          gap={"0.5rem"}
          p={"1.2rem"}
        >
          <People /> Members
        </Typography>
        {GroupMembersBox}
        <Suspense fallback={<h6>LOAIND</h6>}>
          {deleteGroupDialog.open && (
            <ConfirmDeleteDialog
              open={deleteGroupDialog.open}
              openHanlder={deleteGroupDialog.openHandler}
              closeHandler={deleteGroupDialog.closeHandler}
              deleteAction={deleteGroupHandler}
              title={"Delete Group"}
              content={"Are you sure you want to delete this group"}
            />
          )}
        </Suspense>
        <Suspense fallback={<h6>LOAIND</h6>}>
          {addGroupMemberDialog.open && (
            <AddGroupMemberDialog
              open={addGroupMemberDialog.open}
              openHanlder={addGroupMemberDialog.openHandler}
              closeHandler={addGroupMemberDialog.closeHandler}
              saveChangesAction={addGroupMemberSaveChangesHandler}
            />
          )}
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default Groups;
