import React, { useState } from "react";
import * as S from "./LoginStyle";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/ApiClient";

//photo import
import bookImg from "../../assets/images/Login/LoginEarth.png";
import kakaoImg from "../../assets/images/Login/Kakaoimg.png";
import loginbottomImg from "../../assets/images/Login/LoginQImg.png";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  console.log("환경변수", import.meta.env.VITE_APP_SERVER_HOST);
  console.log("apiClient", apiClient);

  function handleLogin() {
    window.location.href = `${
      import.meta.env.VITE_APP_SERVER_HOST
    }/oauth2/authorization/kakao`;
    setIsLogin(true);
  }

  return (
    <S.Container>
      {/* <S.Bg /> */}
      <S.TopLogoWrapper>
        <S.TopLogoImg>
          <S.TitleGoorm />
          <S.Title>MOOCO</S.Title>
        </S.TopLogoImg>
        <S.Titletext>무드를 표현하는 새로운 방법, 무코</S.Titletext>
      </S.TopLogoWrapper>
      <S.BookContainer>
        <S.BookImg src={bookImg} />
      </S.BookContainer>
      <S.KakaoLoginContainer>
        <S.Kakao src={kakaoImg} onClick={handleLogin} />
      </S.KakaoLoginContainer>
      <S.LoginBottom>
        <S.LoginBottomImg src={loginbottomImg} />
      </S.LoginBottom>
      {/* <S.LoudSpeaker />
      <S.Chatting top="45.4rem" left="4rem">
        <S.ChattingText>
          <S.Bold>무코</S.Bold>
          <S.Normal>가 무엇인가요?</S.Normal>
        </S.ChattingText>
      </S.Chatting>
      <S.ChatBox />
      <S.Chatting top="49.1rem" left="6.5rem">
        <S.ChattingText>
          <S.Normal>무드를 담은 바코드아트, </S.Normal>
          <S.Bold>MoOOd_barCOde</S.Bold>
        </S.ChattingText>
      </S.Chatting>
      <S.Chatting top="52rem" left="1.65rem">
        <S.ChattingText>
          <S.Normal>
            무코는 일상의 순간들을 모아 <S.Bold>무드바코드</S.Bold>로 만들어
            드립니다.
          </S.Normal>
        </S.ChattingText>
      </S.Chatting> */}
    </S.Container>
  );
}
