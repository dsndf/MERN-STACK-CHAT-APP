import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useEffect, useState } from "react";
import { VisuallyHiddenInput } from "../../components/style/StyleComponent";
import { useInputValidation } from "6pp";
import { useAvatar } from "../../hooks/useAvatar";
import Title from "../../components/shared/Title";
import { useDispatchAndSelector } from "../../hooks/useDispatchAndSelector";
import { loginUser, registerUser } from "../../redux/slices/authSlice";
import { validatePassword } from "../../validators/validatePassword";
import { validateUsername } from "../../validators/validateUsername";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { mainBg } from "../../constants/color";

const Login = () => {
  const [registerToggle, setRegisterToggle] = useState(false);
  const { avatar, avatarChangeHandler, avatarPreview } = useAvatar();
  const {
    dispatch,
    state: { loading },
  } = useDispatchAndSelector("auth");
  const name = useInputValidation("");
  const username = useInputValidation("", validateUsername);
  const password = useInputValidation("", validatePassword);
  const bio = useInputValidation("");

  const loginUsername = useInputValidation("");
  const loginPassword = useInputValidation("");
  const navigate = useNavigate();

  const registerToggleHandler = () => {
    setRegisterToggle(!registerToggle);
  };
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        username: loginUsername.value,
        password: loginPassword.value,
      })
    );
  };
  const registerHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username.value);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("password", password.value);
    formData.append("avatar", avatar);
    dispatch(registerUser(formData));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: mainBg,
        overflow: "auto",
      }}
    >
      <Title title={"User Auth"} description={"login"} />
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
            {!registerToggle ? "LOGIN" : "REGISTER"}
          </Typography>
          <Box component={"div"}></Box>

          {!registerToggle ? (
            <form onSubmit={loginHandler}>
              <>
                {" "}
                <TextField
                  type="username"
                  label="Username"
                  variant="outlined"
                  fullWidth={true}
                  margin="normal"
                  value={loginUsername.value}
                  onChange={loginUsername.changeHandler}
                  required
                  size="small"
                />
                <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth={true}
                  margin="normal"
                  value={loginPassword.value}
                  onChange={loginPassword.changeHandler}
                  required
                  size="small"
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ margin: "1rem 0" }}
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  Login
                  {loading && (
                    <CircularProgress
                      size={25}
                      sx={{
                        zIndex: 1,
                        position: "absolute",
                      }}
                    />
                  )}
                </Button>
                <Typography variant="p" display={"block"} textAlign={"center"}>
                  OR
                </Typography>
                <Button
                  variant="text"
                  onClick={registerToggleHandler}
                  color="info"
                  fullWidth
                >
                  register instead
                </Button>
              </>
            </form>
          ) : (
            <form encType="multipart/form-data" onSubmit={registerHandler}>
              <>
                <Stack alignItems={"center"} position={"relative"}>
                  <Avatar
                    alt="user image"
                    sx={{ width: 76, height: 76 }}
                    src={avatarPreview}
                  />
                  <IconButton
                    type="file"
                    sx={{
                      position: "absolute",
                      bottom: "-1px",
                      right: "138px",
                      width: 0,
                      padding: 0,
                    }}
                    onClick={(e) => e.preventDefault()}
                  >
                    <CameraAltIcon />
                  </IconButton>
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={avatarChangeHandler}
                  />
                </Stack>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  label="Name"
                  fullWidth
                  required
                  size="small"
                  value={name.value}
                  onChange={name.changeHandler}
                />

                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  label="Bio"
                  fullWidth
                  required
                  size="small"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  type="username"
                  variant="outlined"
                  margin="normal"
                  label="Username"
                  fullWidth
                  required
                  size="small"
                  value={username.value}
                  onChange={username.changeHandler}
                  error={username.error}
                  helperText={username.error}
                  FormHelperTextProps={{ sx: { fontSize: "14px" } }}
                />

                <TextField
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  required
                  size="small"
                  value={password.value}
                  onChange={password.changeHandler}
                  error={password.error}
                  helperText={password.error}
                  FormHelperTextProps={{ sx: { fontSize: "14px" } }}
                />

                {!password.error && password.value && (
                  <Typography
                    sx={{ color: "green" }}
                    fontSize={15}
                    component={"small"}
                  >
                    Password pattern matched
                  </Typography>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ margin: "1rem 0" }}
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  Register
                  {loading && (
                    <CircularProgress
                      size={25}
                      sx={{
                        zIndex: 1,
                        position: "absolute",
                      }}
                    />
                  )}
                </Button>
                <Typography variant="p" display={"block"} textAlign={"center"}>
                  OR
                </Typography>
                <Button
                  variant="text"
                  onClick={registerToggleHandler}
                  color="info"
                  fullWidth
                >
                  login instead
                </Button>
              </>
            </form>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
