import React from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useInputValidation } from "6pp";
import Title from "../../components/shared/Title";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const adminPasskey = useInputValidation("");
  const navigate = useNavigate();

  const adminLoginSubmitHanlder = (e) => {
    e.preventDefault();
    return navigate("/admin/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#FF9A8B",
        backgroundImage:
          "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%",
      }}
    >
      <Title title={"Login"} description={"ChatIO login"} />
      <Container component={"main"} maxWidth={"xs"}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" className="roboto-black">
            ADMIN LOGIN
          </Typography>
          <form onSubmit={adminLoginSubmitHanlder}>
            <>
              <TextField
                type="password"
                label="PassKey"
                variant="outlined"
                fullWidth={true}
                margin="normal"
                value={adminPasskey.value}
                onChange={adminPasskey.changeHandler}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: "1rem 0" }}
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
