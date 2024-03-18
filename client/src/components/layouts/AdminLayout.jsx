import React from "react";
import Grid from "@mui/material/Grid";
import Sidebar from "../specific/Sidebar";
import { inputGray } from "../../constants/color";

const AdminLayout = ({ children }) => {
  return (
    <Grid container spacing={0} height={"100vh"} >
      <Grid item sx={{ display: { xs: "none", md: "block" } }} md={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={9} bgcolor={inputGray} sx={{padding:{xs:"25px"}}}  >
        {children}
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
