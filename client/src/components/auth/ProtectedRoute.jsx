import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SocketApiContext from "../../context/SocketApiContext";

const ProtectedRoute = ({ isAuth, redirect, children }) => {
  if (!isAuth) return <Navigate to={redirect} />;

  return (
    <>
      {children}
      <SocketApiContext>
        <Outlet />
      </SocketApiContext>
    </>
  );
};

export default ProtectedRoute;
