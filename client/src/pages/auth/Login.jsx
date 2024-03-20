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
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState } from "react";
import { VisuallyHiddenInput } from "../../components/style/StyleComponent";
import { useInputValidation } from "6pp";
import { useAvatar } from "../../hooks/useAvatar";
import Title from "../../components/shared/Title";

const Login = () => {
  const [registerToggle, setRegisterToggle] = useState(false);
  const { avatar, avatarChangeHandler, avatarPreview } = useAvatar();

  const name = useInputValidation("");
  const email = useInputValidation("");
  const password = useInputValidation("");
  const bio = useInputValidation("");
 
  const loginEmail = useInputValidation("");
  const loginPassword = useInputValidation("");

  const registerToggleHandler = () => {
    setRegisterToggle(!registerToggle);
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
      <Title title={'Login'}  description={'ChatIO login'}/>
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
          <form>
            {registerToggle ? (
              <>
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth={true}
                  margin="normal"
                  value={loginEmail.value}
                  onChange={loginEmail.changeHandler}
                />
                <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth={true}
                  margin="normal"
                  value={loginPassword.value}
                  onChange={loginPassword.changeHandler}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ margin: "1rem 0" }}
                  color="primary"
                >
                  Login
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
            ) : (
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
                  type="email"
                  variant="outlined"
                  margin="normal"
                  label="Email"
                  fullWidth
                  required
                  size="small"
                  value={email.value}
                  onChange={email.changeHandler}
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
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ margin: "1rem 0" }}
                >
                  register
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
            )}
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
