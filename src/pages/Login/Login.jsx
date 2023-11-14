import React from 'react'
import { S } from './LoginStyle';

export default function Login() {
  return (
    <S.Container>
        <S.Bg />
        <S.Title><S.MoodTitle>MOOD</S.MoodTitle>BARCORD</S.Title>
        <S.Titletext>당신의 일상을 특별하게 <S.MoodText>표현</S.MoodText>하세요</S.Titletext>
            <S.BookContainer>
              <S.Earth />
              <S.Kakao />
              <S.LoudSpeaker />
              <S.ChatBox />
            </S.BookContainer>
    </S.Container>
  )
}
