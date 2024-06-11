import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImage } from "../../lib/features";

// Todo Transform
const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup
        max={max}
        sx={{
          position: "relative",
        }}
      >
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map(({ public_id, url }, index) =>
            index < max ? (
              <Avatar
                key={Math.random() * 100}
                src={url}
                alt={`Avatar ${index}`}
                sx={{
                  width: "3rem",
                  height: "3rem",
                  position: "absolute",
                  left: {
                    sm: `${index/1.2}rem`,
                  },
                }}
              />
            ) : null
          )}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
