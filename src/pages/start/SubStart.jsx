import React from "react";
import { S } from "../Login/LoginStyle";
import StartPage from "../../components/startpage/StartPage";
import { useCookies } from "react-cookie";

function SubStart() {
  const [cookies] = useCookies(["accessCookie", "refreshCookie"]);
  const accessCookie = cookies.accessCookie;
  const refreshCookie = cookies.refreshCookie;
  console.log(cookies.accessCookie);
  console.log(cookies.refreshCookie);


  localStorage.setItem("accessCookie", cookies.accessCookie);
  localStorage.setItem("refreshCookie", cookies.refreshCookie);
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
