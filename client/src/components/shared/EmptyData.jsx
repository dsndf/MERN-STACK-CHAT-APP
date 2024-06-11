import { Typography } from "@mui/material";
import React from "react";

const EmptyData = ({ textContent, icon }) => {
  return (
    <Typography
      fontSize={"large"}
      color={"GrayText"}
      display={"flex"}
      alignItems={"center"}
      gap={"0.5rem"}
    >
      {icon} {textContent}
    </Typography>
  );
};

export default EmptyData;
