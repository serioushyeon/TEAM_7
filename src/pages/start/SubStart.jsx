import React from 'react'
import { S } from '../Login/LoginStyle';
import StartPage from '../../components/startpage/StartPage';
import { useCookies } from "react-cookie";

export default function SubStart() {
   // useCookie를 이용해서 웹 브라우저의 쿠키에서 데이터를 읽어옴
   const [accessCookie] = useCookies(["accessCookie"]);
   const [refreshCookie] = useCookies(["refreshCookie"]);
 
    // accessCookie를 로컬 스토리지에 저장
    localStorage.setItem("accessCookie", accessCookie.accessCookie);
    localStorage.setItem("refreshCookie", refreshCookie.refreshCookie);

   // 웹 브라우저의 로컬 스토리지에 저장된 값을 읽어옴. (클라이언트만 확인)
   const getAccessCookie = localStorage.getItem("accessCookie");
   const getRefreshCookie = localStorage.getItem("refreshCookie"); 

  return (
    <S.Container>
    <S.Bg />
    <S.TitleGoorm />
    <S.Title>MOOCO</S.Title>
        <S.Titletext>무드를 표현하는 새로운 방법, 무코</S.Titletext>
    <StartPage />
    </S.Container>
  )
}
