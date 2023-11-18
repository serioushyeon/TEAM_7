import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login/Login";

export default function PublicLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('그냥 쿠키 없음');
          navigate("/");
      }, []);

  return (
    <div>
      <Outlet />
    </div>
  )
}
