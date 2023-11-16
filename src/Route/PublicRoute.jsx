import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PublicRoute = ({ element: Element, ...rest }) => {
  const { isLogin } = useSelector((state) => state.userData);

  return (
    <Route
      {...rest}
      element={!isLogin ? <Element /> : <Navigate to="/" replace />}
    />
  );
};

export default PublicRoute;
