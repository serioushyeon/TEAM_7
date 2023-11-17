import React from 'react'
import { S } from '../Login/LoginStyle';
import StartPage from '../../components/startpage/StartPage';
import { useCookies } from "react-cookie";

export default function SubStart() {
<<<<<<< HEAD
    // 백엔드에서 설정한 쿠키 이름에 맞게 수정
    const [cookies] = useCookies(["access_cookie", "refresh_cookie"]);
=======
   // useCookie를 이용해서 웹 브라우저의 쿠키에서 데이터를 읽어옴
   const [accessCookie] = useCookies(["accessCookie"]);
   const [refreshCookie] = useCookies(["refreshCookie"]);
 
    // accessCookie를 로컬 스토리지에 저장
    localStorage.setItem("accessCookie", accessCookie.accessCookie);
    localStorage.setItem("refreshCookie", refreshCookie.refreshCookie);

   // 웹 브라우저의 로컬 스토리지에 저장된 값을 읽어옴. (클라이언트만 확인)
   const getAccessCookie = localStorage.getItem("accessCookie");
   const getRefreshCookie = localStorage.getItem("refreshCookie"); 
>>>>>>> 60106a07ea39d4c2715ff065c56559a77aba5521

    localStorage.setItem("accessCookie", cookies.access_cookie);
    localStorage.setItem("refreshCookie", cookies.refresh_cookie);

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
