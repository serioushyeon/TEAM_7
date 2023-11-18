import React, { useState } from "react";
import { S } from "./LoginStyle";
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../../api/ApiClient";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

export default function Login() {

  const navigate = useNavigate();
  const {state} = useLocation();

  console.log("환경변수", import.meta.env.VITE_APP_SERVER_HOST);
  console.log("apiClient", apiClient);

  function handleLogin() {

      window.location.href = `${
        import.meta.env.VITE_APP_SERVER_HOST
      }/oauth2/authorization/kakao`;
  }

  return (
    <S.Container>
      <S.Bg />
      <S.TitleGoorm />
      <S.Title>MOOCO</S.Title>
      <S.Titletext>무드를 표현하는 새로운 방법, 무코</S.Titletext>
      <S.BookContainer>
        <S.Earth />
        <S.Kakao onClick={handleLogin} />
      </S.BookContainer>
      <S.LoudSpeaker />
      <S.Chatting top="28.4rem" left="4rem">
        <S.ChattingText>
          <S.Bold>무코</S.Bold>
          <S.Normal>가 무엇인가요?</S.Normal>
        </S.ChattingText>
      </S.Chatting>
      <S.ChatBox />
      <S.Chatting top="31.1rem" left="6.5rem">
        <S.ChattingText>
          <S.Normal>무드를 담은 바코드아트, </S.Normal>
          <S.Bold>MoOOd_barCOde</S.Bold>
        </S.ChattingText>
      </S.Chatting>
      <S.Chatting top="34rem" left="2.8rem">
        <S.ChattingText>
          <S.Normal>
            무코는 일상의 순간들을 모아 <S.Bold>무드바코드</S.Bold>로 만들어
            드립니다.
          </S.Normal>
        </S.ChattingText>
      </S.Chatting>
    </S.Container>
  );
}
