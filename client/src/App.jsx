import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import {
  loadUser,
  setAuthErr,
  setAuthMessage,
} from "./redux/slices/authSlice.js";
import toast, { Toaster } from "react-hot-toast";
import { Box, CircularProgress } from "@mui/material";
import { useDispatchAndSelector } from "./hooks/useDispatchAndSelector.js";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/auth/Login"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Groups = lazy(() => import("./pages/Groups.jsx"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard.jsx"));
const Messages = lazy(() => import("./pages/Admin/Messages.jsx"));
const ManageUsers = lazy(() => import("./pages/Admin/ManageUsers.jsx"));
const Chats = lazy(() => import("./pages/Admin/Chats.jsx"));
const AdminLogin = lazy(() => import("./pages/auth/AdminLogin.jsx"));

const SuspenseLoader = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"Center"}
      alignItems={"center"}
      height={"100vh"}
      width={"100vw"}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

const App = () => {
  const {
    dispatch,
    state: { isAuth, user, message, err },
  } = useDispatchAndSelector("auth");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  
  useEffect(() => {
    if (err) {
      toast.error(err);
      dispatch(setAuthErr(""));
    } else if (message) {
      toast.success(message);
      dispatch(setAuthMessage(""));
    }
  }, [err, message]);
  return (
    <Router>
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          <Route
            element={<ProtectedRoute isAuth={isAuth} redirect={"/user/auth"} />}
          >
            <Route path="/" element={<Home />}></Route>
            <Route path="/chat/:id" element={<Chat />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/user/auth"
            element={
              <ProtectedRoute isAuth={!isAuth} redirect={"/"}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/messages" element={<Messages />} />
          <Route path="/admin/users-management" element={<ManageUsers />} />
          <Route path="/admin/chats" element={<Chats />} />
          <Route
            path="/admin/login"
            element={
              <ProtectedRoute isAuth={!isAdmin} redirect={"/admin/dashboard"}>
                <AdminLogin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
