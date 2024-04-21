import { useInputValidation } from "6pp";
import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import { users } from "../../constants/sampleData";
import { useLazySearchUserQuery } from "../../redux/api/query";
import { useDispatchAndSelector } from "../../hooks/useDispatchAndSelector";
import {
  setSearchedUsers,
  setUserNotificationLoading,
} from "../../redux/slices/userNotificationSlice";


const FindFriends = ({ open, closeHandler }) => {
  const searchFriend = useInputValidation("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUser, results] = useLazySearchUserQuery();
  const {
    dispatch,
    state: { loading, searchedUsers },
  } = useDispatchAndSelector("userNotification");
  useEffect(() => {
    dispatch(setUserNotificationLoading(true));
    const tid = setTimeout(() => {
      searchUser(searchFriend.value);
    },1500);
    return () => clearTimeout(tid);
  }, [searchFriend.value]);

  useEffect(() => {
    if (results.isSuccess) {
      console.log(results);
      dispatch(setSearchedUsers(results.data.users));
    }
  }, [results]);

  const sendFriendRequestHandler = (id) => {};
  return (
    <Dialog open={open}>
      <Stack p={"1rem"} width={"420px"}>
        <DialogTitle textAlign={"center"}>Find Friends</DialogTitle>
        <TextField
          variant="outlined"
          type="text"
          size="small"
          value={searchFriend.value}
          onChange={searchFriend.changeHandler}
          placeholder="Search new friends here"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      {
        results.isFetching &&<Box mt={2} textAlign={'center'}><CircularProgress  size={20} /></Box>
      }
        <UserList
          users={searchedUsers}
          selectedUsersList={selectedUsers}
          handler={sendFriendRequestHandler}
        />
        <DialogActions>
          <Button onClick={closeHandler}>Close</Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default FindFriends;
