import React from "react";
import Grid from "@mui/material/Grid";
import Sidebar from "../specific/Sidebar";
import { inputGray } from "../../constants/color";
import { Drawer, Icon, IconButton } from "@mui/material";
import { useDialog } from "../../hooks/useDialog";
import { Close, Menu } from "@mui/icons-material";


const AdminLayout = ({ children }) => {
  const menuToggle = useDialog({});



  return (
    <Grid container spacing={0} height={"100vh"} position={"relative"}>
      <IconButton
        onClick={menuToggle.openHandler}
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: "0.5rem",
          right: "0.5rem",
        }}
      >
        {menuToggle.open ? <Close /> : <Menu />}
      </IconButton>
      <Drawer
        sx={{ display: { xs: "block", md: "none" } }}
        open={menuToggle.open}
        onClose={menuToggle.closeHandler}
      >
        <Sidebar style={{ width: "300px" }} />
      </Drawer>
      <Grid height={"100vh"} item sx={{ display: { xs: "none", md: "block" } }} md={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sx={{height:{md:"100vh"}}} md={9} bgcolor={inputGray} >
        {children}
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
