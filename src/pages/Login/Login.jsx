import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { S } from './LoginStyle';

export default function Login() {
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    navigate('/substart');
    setIsLogin(true);
  }

  return (
    <S.Container>
        <S.Bg />
        <S.Title><S.MoodTitle>MOOD</S.MoodTitle>BARCORD</S.Title>
        <S.Titletext>당신의 일상을 특별하게 <S.MoodText>표현</S.MoodText>하세요</S.Titletext>
            <S.BookContainer>
              <S.Earth />
              <S.Kakao onClick={handleLogin}/>
            </S.BookContainer>
            <S.LoudSpeaker />
              <S.ChatBox />
    </S.Container>
  )
}
