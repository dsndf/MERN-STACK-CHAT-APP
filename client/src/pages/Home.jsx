import React, { memo, useEffect, useState } from "react";
import AppLayout from "../components/layouts/AppLayout";
import Title from "../components/shared/Title";

const Home = () => {
  useEffect(() => {
    console.info("api called");
  }, []);
  return (
    <>
      <Title title={"Home"} />
    </>
  );
};

export default memo(AppLayout()(Home));
