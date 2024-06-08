import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  Fragment,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";
import { lightGrayBg } from "../constants/color";
import {
  KeyboardBackspace,
  Menu,
  Group,
  Edit,
  Add,
  People,
  Close,
  Done,
  Cancel,
} from "@mui/icons-material";
import { useDialog } from "../hooks/useDialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import GroupList from "../components/specific/GroupList";
import { users } from "../constants/sampleData";
import {
  useDeleteGroupMutation,
  useEditGroupNameMutation,
  useGetMyGroupsQuery,
} from "../redux/api/query.js";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../components/specific/UserList.jsx";
import { setSelectedGroup } from "../redux/slices/miscSlice.js";
import { useMutation } from "../hooks/useMutation.js";
import FindFreindsSkeleton from "../components/skeleton/FindFreindsSkeleton.jsx";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialog/ConfirmDeleteDialog.jsx")
);
const AddGroupMemberDialog = lazy(() =>
  import("../components/dialog/AddMember.jsx")
);

const Groups = () => {
  const drawer = useDialog({});
  const navigate = useNavigate();
  const deleteGroupDialog = useDialog({});
  const addGroupMemberDialog = useDialog({});

  const [removedMembers, setRemovedMembers] = useState([]);
  const dispatch = useDispatch();

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

  const executeDeleteGroupMutation = useMutation({
    hook: useDeleteGroupMutation,
  });
  const deleteGroupHandler = async () => {
    await executeDeleteGroupMutation({ chatId: selectedGroup?._id });
    dispatch(setSelectedGroup({ group: {}, isSelected: false }));
  };
  const addGroupMemberSaveChangesHandler = () => {
    addGroupMemberDialog.closeHandler();
  };

  const myGroups = useGetMyGroupsQuery();

  // GROUP NAME EDIT CODE STARTS

  const groupName = useSearchParams()[0].get("group");
  const [newGroupName, setNewGroupName] = useState("");
  const { isGroupSelected, selectedGroup } = useSelector(
    (state) => state["misc"]
  );
  const [isGroupNameEdit, setIsGroupNameEdit] = useState(false);
  const groupNameEditHandler = () => {
    setIsGroupNameEdit(true);
  };
  const cancelToEditGroupName = () => {
    setIsGroupNameEdit(false);
    setNewGroupName(groupName);
  };

  const newGroupNameChangeHandler = (e) => setNewGroupName(e.target.value);

  useEffect(() => {
    if (groupName) {
      setNewGroupName(groupName);
      setIsGroupNameEdit(false);
    }
  }, [groupName]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedGroup({ group: {}, isSelected: false }));
    };
  }, []);

  const executeEditGroupNameMutation = useMutation({
    hook: useEditGroupNameMutation,
    loadingMessage: "Updating group",
  });

  const updateGroupName = async () => {
    await executeEditGroupNameMutation({
      name: newGroupName,
      chatId: selectedGroup._id,
    });
    navigate("/");
  };
  // GROUP NAME EDIT CODE END

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
              value={newGroupName}
              onChange={newGroupNameChangeHandler}
            />
          ) : (
            <Typography variant="h4" color="initial">
              {selectedGroup?.name || "Group XYZ"}
            </Typography>
          )}
          {!isGroupNameEdit && (
            <IconButton
              sx={{ height: "fit-content" }}
              onClick={groupNameEditHandler}
            >
              <Edit />
            </IconButton>
          )}
          {isGroupNameEdit && (
            <IconButton
              sx={{ height: "fit-content" }}
              onClick={updateGroupName}
            >
              <Done />
            </IconButton>
          )}
          {isGroupNameEdit && (
            <IconButton
              sx={{ height: "fit-content" }}
              onClick={groupNameEditHandler}
            >
              <Cancel />
            </IconButton>
          )}
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
        <Stack
          alignItems={"center"}
          width={"100%"}
          maxHeight={"15rem"}
          sx={{ overflow: "auto" }}
        >
          {users && (
            <UserList
              users={users}
              selectedUsersList={users.map(({ _id }) => _id)}
            />
          )}
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
        <GroupList groupList={myGroups.data?.groups} />
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

        {isGroupSelected ? (
          <Fragment>
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

            <Suspense fallback={<FindFreindsSkeleton />}>
              {addGroupMemberDialog.open && (
                <AddGroupMemberDialog
                  open={addGroupMemberDialog.open}
                  openHanlder={addGroupMemberDialog.openHandler}
                  closeHandler={addGroupMemberDialog.closeHandler}
                  saveChangesAction={addGroupMemberSaveChangesHandler}
                />
              )}
            </Suspense>
          </Fragment>
        ) : (
          <Typography variant="h5" p={"4rem"} textAlign={"center"}>
            Select a group to edit
          </Typography>
        )}
      </Grid>
      <Drawer open={drawer.open} onClose={drawer.closeHandler}>
        <GroupList groupList={myGroups.data?.groups} />
      </Drawer>
    </Grid>
  );
};

export default Groups;
