import React from 'react'
import { S } from './PassportStyle';
import First from '../../components/useinfo/FirstInfo';
import Second from '../../components/useinfo/SecondInfo'
import { useCookies } from "react-cookie";


export default function Passport() {
// useCookie를 이용해서 웹 브라우저의 쿠키에서 데이터를 읽어옴
// useCookie를 이용해서 웹 브라우저의 쿠키에서 데이터를 읽어옴
const [accessCookie] = useCookies(["accessCookie"]);
const [refreshCookie] = useCookies(["refreshCookie"]);

 // accessCookie를 로컬 스토리지에 저장
localStorage.setItem("accessCookie", accessCookie.accessCookie);
localStorage.setItem("refreshCookie", refreshCookie.refreshCookie);

console.log(accessCookie.accessCookie)
console.log(refreshCookie.refreshCooki)

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