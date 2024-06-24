import { Skeleton } from "@mui/material";
import React from "react";

const ChatListItemSkeleton = () => {
  return (
    <Card
      variant="outlined"
      component={"div"}
    >
      <CardHeader
        sx={{ ml: { xs: "0", md: "1rem" } }}
        title={<Skeleton variant="text" width={"100%"} />}
        subheader={<Skeleton variant="text" width={"50%"} />}
        titleTypographyProps={{
          fontWeight: 500,
          color: isSelected ? "#fff" : "black",
          ml: "1rem",
          fontSize: "15px",
        }}
        subheaderTypographyProps={{ ml: 2, color: "green" }}
        avatar={<AvatarCard avatar={avatar} max={4} />}
        action={
          isOnline && (
            <Stack
              flexDirection={"row"}
              height={"100%"}
              alignItems={"center"}
              gap={"1rem"}
              mt={"1.5rem"}
              mr={1}
            >
              <Box
                width={"0.5rem"}
                height={"0.5rem"}
                borderRadius={"100%"}
                bgcolor={onlineColor}
                position={"relative"}
              >
                <StyledOnlineEffect />
              </Box>
            </Stack>
          )
        }
      />
    </Card>
  );
};

export default ChatListItemSkeleton;
