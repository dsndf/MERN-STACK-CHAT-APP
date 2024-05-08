import {
  Dialog,
  DialogActions,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import { Search } from "@mui/icons-material";
import {
  useCreateNewGroupMutation,
  useLazyGetFriendsQuery,
} from "../../redux/api/query";
import { useInputValidation } from "6pp";
import { useErrors } from "../../hooks/useErrors";
import { useMutation } from "../../hooks/useMutation";

const NewGroup = ({ open, closeHandler }) => {
  const [getFriends, getFriendsResponse] = useLazyGetFriendsQuery();
  const executeCreateNewGroupMutation = useMutation({
    hook: useCreateNewGroupMutation,
    loadingMessage: "Creating new group...",
  });
  useErrors({
    isError: getFriendsResponse.isError,
    error: getFriendsResponse.error,
    state: getFriendsResponse,
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
    executeCreateNewGroupMutation({
      members: selectedMembers,
      name: "Team Hanuman",
    });
    closeHandler();
  };
  useEffect(() => {
    getFriends({ keyword: searchPeople.value });
  }, [searchPeople.value]);
  return (
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
  );
};

export default NewGroup;
