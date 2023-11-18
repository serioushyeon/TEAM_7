import React from "react";
import { S } from "../Login/LoginStyle";
import StartPage from "../../components/startpage/StartPage";
import { useCookies } from "react-cookie";

function SubStart() {
  const [accessCookie] = useCookies(["access_cookie"]);
  const [refreshCookie] = useCookies(["refresh_cookie"]);
  
   localStorage.setItem("accessCookie", accessCookie.access_cookie);
   localStorage.setItem("refreshCookie", refreshCookie.refresh_cookie);
  
    console.log(accessCookie.access_cookie);
    console.log(refreshCookie.refresh_cookie);
  return (
    <>
      <S.TitleGoorm />
      <S.Title>MOOCO</S.Title>
      <S.Titletext>무드를 표현하는 새로운 방법, 무코</S.Titletext>
      <StartPage />
    </>
  );
}

export default SubStart;
