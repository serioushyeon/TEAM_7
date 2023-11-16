import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { isLogin } = useSelector((state) => state.userData);

  return (
    <Route
      {...rest}
      element={
        isLogin ? (
          children
        ) : (
          <Navigate to="/" state={{ next: rest.location.pathname }} />
        )
      }
    />
  );
};

export default PrivateRoute;
