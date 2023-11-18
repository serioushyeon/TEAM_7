import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

// private한 페이지에 접근하면 AuthLayout의 useEffect를 통해서 cookie에 token이 있는지 확인한다.
// 만일 token 값이 없다면 useNavigate를 이용해 로그인 페이지로 이동한다.
// 첫 번째 인수로는 state의 값으로 현재의 pathname을 저장한다.

const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const getAccessCookie = localStorage.getItem("accessCookie");
    // 쿠키가 없으면 로그인으로 이동한다. 아니라면 pathname을 state에 저장한다.
    
    if((getAccessCookie &&
        getAccessCookie !== "undefined" && 
        getAccessCookie !== undefined)) {
    } else {
        alert("로그인이 필요한 기능입니다.");
        console.log('쿠키 없음, 로그인, pathname 전달');
        navigate("/", { state: { from: pathname } }); 
    }     
}, [navigate, pathname]);
    
  return (
    <div>
      <Outlet />
    </div>
  );
  };

export default AuthLayout;