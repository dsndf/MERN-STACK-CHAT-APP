import {
  Dialog,
  DialogActions,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import UserList from "./UserList";
import { Search } from "@mui/icons-material";
import {
  useCreateNewGroupMutation,
  useLazyGetFriendsQuery,
} from "../../redux/api/query";
import { useInputValidation } from "6pp";
import { useErrors } from "../../hooks/useErrors";
import { useMutation } from "../../hooks/useMutation";
import { getSocket } from "../../context/SocketApiContext";
import { useDialog } from "../../hooks/useDialog";
import { lazy } from "react";
const GroupNameDialog = lazy(() => import("../dialog/GroupNameDialog"));
const NewGroup = ({ open, closeHandler }) => {
  const socket = getSocket();
  const [getFriends, getFriendsResponse] = useLazyGetFriendsQuery();
  const executeCreateNewGroupMutation = useMutation({
    hook: useCreateNewGroupMutation,
    loadingMessage: "Creating new group...",
    onSuccess: null,
  });
  useErrors({
    isError: getFriendsResponse.isError,
    error: getFriendsResponse.error,
    state: getFriendsResponse,
  });
  const groupNameDialog = useDialog({
    onCloseFunction: () => closeHandler(),
  });

  const [selectedMembers, setSeletedMembers] = useState([]);
  const searchPeople = useInputValidation("");
  const selectGroupMemberHandler = (id) => {
    setSeletedMembers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((member) => member !== id);
      } else return [...prev, id];
    });
  };
  const doneButtonClickHandler = () => {
    closeHandler();
    groupNameDialog.openHandler();
  };
  useEffect(() => {
    getFriends({ keyword: searchPeople.value });
  }, [searchPeople.value]);
  return (
    <Fragment>
      {" "}
      <Dialog open={open} onClose={closeHandler}>
        <Stack p={"1rem"} width={350}>
          <DialogTitle textAlign={"center"}>New Group</DialogTitle>
          <TextField
            value={searchPeople.value}
            onChange={searchPeople.changeHandler}
            placeholder="Search people here."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Stack>
            <UserList
              users={getFriendsResponse?.data?.friends}
              handler={selectGroupMemberHandler}
              selectedUsersList={selectedMembers}
            />
          </Stack>{" "}
          <DialogActions>
            <Button variant="text" color="error" onClick={closeHandler}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={doneButtonClickHandler}
            >
              Done
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
      {groupNameDialog.open && (
        <Suspense>
          <GroupNameDialog
            open={groupNameDialog.open}
            onClose={groupNameDialog.closeHandler}
          />
        </Suspense>
      )}
    </Fragment>
  );
};

export default NewGroup;
