import React, { memo, useEffect, useState } from "react";
import AppLayout from "../components/layouts/AppLayout";
import Title from "../components/shared/Title";
import { StyledHomeColumn } from "../components/style/StyleComponent";
import { Box, Typography } from "@mui/material";
import homepng from "../assets/home/home.png";

const Home = () => {
  return (
    <StyledHomeColumn>
      <Title title={"Home"} />
      <Typography
        component={"h3"}
        fontSize={"1.7rem"}
        p={"2rem"}
        textAlign={"center"}
      >
        Select a Chat
      </Typography>
      <Box width={"100%"}>
        <img
          src={homepng}
          width={"35%"}
          
          style={{opacity:0.9, margin: "auto", display: "block",}}
        />
      </Box>
    </StyledHomeColumn>
  );
};

export default memo(AppLayout()(Home));
