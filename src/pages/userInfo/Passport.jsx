import React, { useEffect } from 'react'
import { S } from './PassportStyle';
import First from '../../components/useinfo/FirstInfo';
import Second from '../../components/useinfo/SecondInfo'
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";


export default function Passport() {

  const navigate = useNavigate();
  const {state} = useLocation();

  useEffect(() => {
    if(state) {
      navigate(state);
    }
  });
  
// useCookie를 이용해서 웹 브라우저의 쿠키에서 데이터를 읽어옴
// useCookie를 이용해서 웹 브라우저의 쿠키에서 데이터를 읽어옴
const [accessCookie] = useCookies(["access_cookie"]);
const [refreshCookie] = useCookies(["refresh_cookie"]);

 localStorage.setItem("accessCookie", accessCookie.access_cookie);
 localStorage.setItem("refreshCookie", refreshCookie.refresh_cookie);

  console.log(accessCookie.access_cookie);
  console.log(refreshCookie.refresh_cookie);

  return (
    <>
        <S.Bg>
        <S.TitleGoorm />
        <S.Title>MOOCO</S.Title>
        <S.Titletext>마이페이지</S.Titletext>
          <S.BookBg>
        <First />
        <Second />
          </S.BookBg>
        </S.Bg>
    </>
  )
}