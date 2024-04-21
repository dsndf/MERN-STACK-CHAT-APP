import { Box, Skeleton } from "@mui/material";
import React from "react";

const UserListItemSkeleton = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={2}
      gap="10rem"
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={4}
      >
        <Skeleton variant="circular" width={42} height={42} />
        <Skeleton variant="text" width={100} />
      </Box>

      <Box>
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    </Box>
  );
};

export default UserListItemSkeleton;
