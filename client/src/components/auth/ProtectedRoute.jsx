import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuth, redirect, children }) => {
  if (!isAuth) return <Navigate to={redirect} />;
  
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
