import React from "react";
import { S } from "../Login/LoginStyle";
import StartPage from "../../components/startpage/StartPage";
import { useCookies } from "react-cookie";

function SubStart() {
const [accessCookie] = useCookies(["access_Cookie"]);
const [refreshCookie] = useCookies(["refresh_Cookie"]);

 localStorage.setItem("accessCookie", accessCookie.access_Cookie);
 localStorage.setItem("refreshCookie", refreshCookie.refresh_Cookie);

  console.log(accessCookie.access_Cookie);
  console.log(refreshCookie.refresh_Cooki);
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
