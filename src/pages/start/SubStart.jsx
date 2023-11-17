import React from 'react'
import { S } from '../Login/LoginStyle';
import StartPage from '../../components/startpage/StartPage';
import { useCookies } from "react-cookie";

export default function SubStart() {
    // 백엔드에서 설정한 쿠키 이름에 맞게 수정
    const [cookies] = useCookies(["access_cookie", "refresh_cookie"]);

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
