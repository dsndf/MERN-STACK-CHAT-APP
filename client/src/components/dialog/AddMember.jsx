import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserList from "../specific/UserList";
import { users } from "../../constants/sampleData";
import { Search } from "@mui/icons-material";
import {
  useAddMembersMutation,
  useLazyGetFriendsQuery,
} from "../../redux/api/query";
import { useInputValidation } from "6pp";
import { useMutation } from "../../hooks/useMutation";

import { useNavigate, useSearchParams } from "react-router-dom";

const AddMember = ({ open, closeHandler, friendsToAvoid = [] }) => {
  const navigate = useNavigate();
  const [selectedMembers, setSeletedMembers] = useState([]);
  const chatId = useSearchParams()[0].get("group");
  const addGroupMemberHandler = (id) => {
    setSeletedMembers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((member) => member !== id);
      } else return [...prev, id];
    });
  };

  // Get friends code start
  const searchPeople = useInputValidation("");
  const [getFriends, getFriendsResponse] = useLazyGetFriendsQuery();
  useEffect(() => {
    const tid = setTimeout(() => {
      getFriends({ keyword: searchPeople.value }, true);
    }, 2000);
    return () => {
      clearTimeout(tid);
    };
  }, [searchPeople.value]);
  // Get friends code end

  // Add members code start
  const executeAddMembersMutation = useMutation({
    hook: useAddMembersMutation,
    loadingMessage: "Saving changes...",
  });
  const executeAddMemberMutationHandler = async () => {
    if (!selectedMembers.length) return;
    await executeAddMembersMutation({
      members: selectedMembers,
      chatId: chatId,
    });
  };
  // Add members code end

  return (
    <Dialog open={open} onClose={closeHandler}>
      <Box p></Box>
      <DialogTitle>Add Member</DialogTitle>
      <TextField
        value={searchPeople.value}
        onChange={searchPeople.changeHandler}
        type="text"
        size="small"
        placeholder="Search people here"
        sx={{ m: "1rem" }}
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <DialogContent sx={{ width: "20rem", py: 0 }}>
        <DialogContentText>
          Let's have a new members into the group.
        </DialogContentText>
        <UserList
          users={getFriendsResponse.data?.friends?.filter(
            (friend) => !friendsToAvoid.includes(friend?._id)
          )}
          handler={addGroupMemberHandler}
          selectedUsersList={selectedMembers}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="text" onClick={closeHandler}>
          CANCEL
        </Button>
        <Button variant="contained" onClick={executeAddMemberMutationHandler}>
          SAVE CHANGES
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMember;
