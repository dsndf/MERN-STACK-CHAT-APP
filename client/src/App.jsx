import React, { Suspense, lazy, useEffect } from "react";
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
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute.jsx";

const Home = lazy(() => import("./pages/Home"));

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
    >
      <CircularProgress  size={50} />
    </Box>
  );
};

const App = () => {
  const {
    dispatch,
    state: { isAuth, user, message, err, isAdmin },
  } = useDispatchAndSelector("auth");


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
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute
                isAdmin={isAdmin}
                redirect={"/admin/login"}
              ></AdminProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="messages" element={<Messages />} />
            <Route path="users-management" element={<ManageUsers />} />
            <Route path="chats" element={<Chats />} />
          </Route>

          <Route
            path="/admin/login"
            element={
              <AdminProtectedRoute
                isAdmin={!isAdmin}
                redirect={"/admin/dashboard"}
              >
                <AdminLogin />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
