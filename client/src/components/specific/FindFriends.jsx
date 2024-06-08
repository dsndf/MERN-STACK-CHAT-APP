import { useInputValidation } from "6pp";
import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import UserList from "./UserList";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/query";
import { useMutation } from "../../hooks/useMutation";

const FindFriends = ({ open, closeHandler }) => {
  // Searching users code start
  const search = useInputValidation("");
  const [searchUsers, searchUsersResult] = useLazySearchUserQuery();
  useEffect(() => {
    let tid = setTimeout(() => {
      searchUsers(search.value);
    }, 2000);
    return () => clearTimeout(tid);
  }, [search.value]);
  // Searching users code end

  // Send Friend req  code start
  const executeSendFriendReqMutation = useMutation({
    hook: useSendFriendRequestMutation,
  });
  // Send Friend req  code end

  return (
    <Dialog open={open}>
      <DialogTitle textAlign={"center"}>Find Friends</DialogTitle>{" "}
      <TextField
        variant="outlined"
        type="text"
        size="small"
        value={search.value}
        onChange={search.changeHandler}
        placeholder="Search new friends here"
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
        {searchUsersResult.isFetching && (
          <Box mt={2} textAlign={"center"}>
            <CircularProgress size={20} />
          </Box>
        )}
        <Box>
          <UserList
            users={searchUsersResult.data?.users || []}
            handler={executeSendFriendReqMutation}
            isFriendRequest={true}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FindFriends;
