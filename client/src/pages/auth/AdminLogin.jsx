import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { useInputValidation } from "6pp";
import Title from "../../components/shared/Title";
import { useNavigate } from "react-router-dom";
import { adminLogin, adminVerifyAuth } from "../../redux/thunk/adminAuth";
import { useDispatchAndSelector } from "../../hooks/useDispatchAndSelector";
import { mainBg } from "../../constants/color";

const AdminLogin = () => {
  const adminPasskey = useInputValidation("");
  const navigate = useNavigate();
  const theme =  useTheme();
  
  const {
    dispatch,
    state: { loading },
  } = useDispatchAndSelector("auth");
  const adminLoginSubmitHanlder = (e) => {
    e.preventDefault();
    return dispatch(adminLogin(adminPasskey));
  };
   

  useEffect(() => {
    dispatch(adminVerifyAuth());
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor:theme.palette.secondary.main,
    
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
                size="small"
                color="secondary"
                value={adminPasskey.value}
                onChange={adminPasskey.changeHandler}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: "1rem 0" }}
                color="secondary"
                type="submit"
                disabled={loading}
              >
                {loading && (
                  <CircularProgress
                    size={25}
                    sx={{
                      zIndex: 1,
                      position: "absolute",
                    }}
                  />
                )}
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
