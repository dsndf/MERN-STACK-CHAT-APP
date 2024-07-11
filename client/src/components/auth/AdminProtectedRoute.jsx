import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = ({ isAdmin = false, redirect, children }) => {
  if (!isAdmin) return <Navigate to={redirect} />;
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default AdminProtectedRoute;
