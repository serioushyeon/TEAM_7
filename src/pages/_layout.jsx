import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <Suspense fallback={"loading..."}>
      <Outlet />
    </Suspense>
  );
};

export default GlobalLayout;
