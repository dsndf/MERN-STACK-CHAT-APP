import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

const Widget = ({ count, title, icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        flex: { xs: "", md: "1" },
        width: "200px",
        height: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "10px",
      }}
    >
      <Box
        borderRadius={"100%"}
        border={"8px solid navy"}
        width={"100px"}
        height={"100px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant="h6" color="initial">
          {count}
        </Typography>
      </Box>
      <Stack
        width={"100%"}
        justifyContent={"center"}
        direction={"row"}
        gap={"15px"}
      >
        {icon} {title}
      </Stack>
    </Paper>
  );
};

export default Widget;
