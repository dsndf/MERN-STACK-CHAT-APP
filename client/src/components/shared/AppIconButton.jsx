import { IconButton, Tooltip } from "@mui/material";
import React from "react";

const AppIconButton = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton sx={{color:"white"}} onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  );
};

export default AppIconButton;
