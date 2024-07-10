import React from "react";
import { getUserAuth } from "../../redux/store";
import { Box, Typography } from "@mui/material";
import { mainBg } from "../../constants/color";
import { motion } from "framer-motion";

const Typing = () => {
  const MotionBox = motion(Box);
  
  return (
    <MotionBox
    initial={
      {
        y:"100%",
        opacity:0
      }
      }
      whileInView={{
        y:"0%",
        opacity:1,
      }}
      p={"10px"}
      bgcolor={"white"}
      color={mainBg}
      width={"fit-content"}
      borderRadius={"0.5rem"}
      zIndex={1}
   
    >
      <Typography textAlign={'right'} fontWeight={600} letterSpacing={"1px"} variant="subtitle2">
        Typing...
      </Typography>
    </MotionBox>
  );
};

export default Typing;
