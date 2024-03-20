import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
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
  Search,
} from "@mui/icons-material";
import moment from "moment";
import { DougnutChart, LineChart } from "../../components/specific/Charts";
import Widget from "../../components/specific/Widget";
import { getLast7days } from "../../lib/features";

const Dashboard = () => {
  console.log(getLast7days());
  return (
    <AdminLayout>
      <Stack spacing={"1rem"} p={"1rem"}>
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
                  label="Search"
                  sx={{
                    borderRadius: "10px",
                    p: "0",
                    width: { xs: "150px", sm: "250px", md: "auto" },
                  }}
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

            <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
              <Box display={{ xs: "none", md: "block" }}>
                {moment().format("YYYY MMM DD , hh:mm A")}
              </Box>

              <IconButton>
                <Notifications htmlColor="black" fontSize="medium" />
              </IconButton>
            </Box>
          </Stack>
        </Paper>
        <Stack
          sx={{ flexDirection: { xs: "column", md: "row" } }}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"1rem"}
          width={"100%"}
        >
          <Paper
            elevation={3}
            sx={{ padding: "10px", width: { xs: "100%", md: "60%" } }}
          >
            <Typography variant="h5" mb={"1rem"} color="initial">
              Last Messages
            </Typography>
            <Box sx={{ height: { xs: "auto", md: "auto" }, width: "auto" }}>
              <LineChart />
            </Box>
          </Paper>
          <Paper
            elevation={3}
            sx={{ width: { xs: "100%", md: "35%" }, padding: "10px" }}
          >
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
                top={0}
                left={0}
                right={0}
                bottom={0}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"1rem"}
              >
                <Person /> vs <Group />
              </Typography>
              <DougnutChart />
            </Box>
          </Paper>
        </Stack>

        <Stack
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"1rem"}
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
