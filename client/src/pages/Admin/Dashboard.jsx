import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings,
  Group,
  Message,
  Notifications,
  Person,
} from "@mui/icons-material";
import moment from "moment";
import { AdminStyledPaper } from "../../components/style/StyleComponent";
import { DougnutChart, LineChart } from "../../components/specific/Charts";
import Widget from "../../components/specific/Widget";
import { getLast7days } from "../../lib/features";

const Dashboard = () => {
  console.log(getLast7days());
  return (
    <AdminLayout>
      <Stack flexWrap={"wrap"} spacing={"1rem"}>
        <Paper elevation={3} sx={{ borderRadius: "5px", p: "15px" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <AdminPanelSettings fontSize="large" />
              <Box>
                <TextField
                  size="small"
                  placeholder="Search..."
                  sx={{ borderRadius: "10px", p: "0" }}
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                      marginRight: "5px",
                    },
                  }}
                />
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ borderRadius: "30px" }}
                >
                  Search
                </Button>
              </Box>
            </Box>

            <Box>
              <Box display={{ xs: "none", md: "block" }}>
                {" "}
                {moment().format("YYYY MMM DD")}
              </Box>

              <IconButton>
                <Notifications htmlColor="black" fontSize="medium" />
              </IconButton>
            </Box>
          </Stack>
        </Paper>
        <AdminStyledPaper elevation={3}>
          <Typography variant="h5" mb={"1rem"} color="initial">
            Last Messages
          </Typography>
          <Box sx={{ height: "330px", width: "100%" }}>
            <LineChart />
          </Box>
        </AdminStyledPaper>
        <AdminStyledPaper elevation={3} sx={{ width: "400px" }}>
          <Box
            position={"relative"}
            sx={{ height: "300px" }}
            display={"flex"}
            justifyContent={"center"}
            mx={"auto"}
          >
            <Typography
              variant="body1"
              color="initial"
              position={"absolute"}
              top={"calc(100% - 50%)"}
              left={"calc(50% - 10%)"}
              display={"flex"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <Person /> vs <Group />
            </Typography>
            <DougnutChart />
          </Box>
        </AdminStyledPaper>
        <Stack
          direction={"row"}
          spacing={"1rem"}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <Widget title={"Users"} count={23} icon={<Person />} />
          <Widget title={"Chats"} count={15} icon={<Group />} />
          <Widget title={"Messages"} count={100} icon={<Message />} />
        </Stack>
      </Stack>
    </AdminLayout>
  );
};

export default Dashboard;
