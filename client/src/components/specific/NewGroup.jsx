import {
  Dialog,
  DialogActions,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Button,
  DialogContent,
  Box,
  DialogContentText,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import UserList from "./UserList";
import { Diversity1, Group, Search } from "@mui/icons-material";
import {
  useCreateNewGroupMutation,
  useLazyGetFriendsQuery,
} from "../../redux/api/query";
import { useInputValidation } from "6pp";
import { useErrors } from "../../hooks/useErrors";
import { useMutation } from "../../hooks/useMutation";
import { getSocket } from "../../context/SocketApiContext";
import toast from "react-hot-toast";
import { validateNewGroupName } from "../../validators/validateNewGroupName";
import EmptyData from "../shared/EmptyData";

const NewGroup = ({ open, closeHandler }) => {
  const socket = getSocket();
  const newGroupName = useInputValidation("", validateNewGroupName);
  // Get friends code start
  const searchPeople = useInputValidation("");
  const [getFriends, getFriendsResponse] = useLazyGetFriendsQuery();
  const friends = getFriendsResponse?.data?.friends || [];
  useEffect(() => {
    getFriends({ keyword: searchPeople.value });
  }, [searchPeople.value]);
  // Get friends code end

  // Select members code start
  const [selectedMembers, setSeletedMembers] = useState([]);
  const selectGroupMemberHandler = (id) => {
    setSeletedMembers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((member) => member !== id);
      } else return [...prev, id];
    });
  };
  // Select members code end

  // Create new group code start
  const executeCreateNewGroupMutation = useMutation({
    hook: useCreateNewGroupMutation,
    loadingMessage: "Creating new group...",
    onSuccess: null,
  });

  const doneButtonClickHandler = () => {
    executeCreateNewGroupMutation({
      members: selectedMembers,
      name: newGroupName.value,
    });
    closeHandler();
  };
  // Create new group code end

  return (
    <Dialog open={open} onClose={closeHandler}>
      <Box p></Box>

      <DialogTitle textAlign={"center"}>New Group</DialogTitle>
      <Fragment>
        <TextField
          value={newGroupName.value}
          onChange={newGroupName.changeHandler}
          error={newGroupName.error && newGroupName.error}
          helperText={newGroupName.error}
          label={"Group Name"}
          FormHelperTextProps={{
            color: "red",
          }}
          size="small"
          sx={{ m: "1rem" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={searchPeople.value}
          onChange={searchPeople.changeHandler}
          placeholder="Search people here"
          size="small"
          sx={{ m: "1rem" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      
        <DialogContent sx={{ width: "20rem", py: 0 }}>
        { getFriendsResponse.isFetching && (
          <Box mt={2} textAlign={"center"}>
            <CircularProgress size={20} />
          </Box>
        )}
          {friends.length ? (
            <UserList
              users={friends}
              handler={selectGroupMemberHandler}
              selectedUsersList={selectedMembers}
            />
          ) : (
          <Typography variant="body1" textAlign={"center"} >No friends</Typography>
          )}
        </DialogContent>
      </Fragment>

      <Box p></Box>
      <DialogActions>
        <Button variant="text" color="error" onClick={closeHandler}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={doneButtonClickHandler}
          disabled={friends.length === 0 || newGroupName.error}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGroup;
