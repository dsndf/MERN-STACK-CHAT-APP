import React, { Suspense, lazy, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLogin from "./pages/auth/AdminLogin.jsx";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/auth/Login"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Groups = lazy(() => import("./pages/Groups.jsx"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard.jsx"));
const Messages = lazy(() => import("./pages/Admin/Messages.jsx"));
const ManageUsers = lazy(() => import("./pages/Admin/ManageUsers.jsx"));
const Chats = lazy(() => import("./pages/Admin/Chats.jsx"));

const App = () => {
  const [state, setState] = useState();
  const [isAuth, setIsAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route
            element={<ProtectedRoute isAuth={isAuth} redirect={"/login"} />}
          >
            <Route path="/" element={<Home />}></Route>
            <Route path="/chat/:id" element={<Chat />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
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
    </Router>
  );
};

export default App;
