import React from 'react'
import { S } from './Style';
import StartPage from '../../components/startpage/StartPage'
import { useNavigate } from 'react-router-dom';

export default function SubStart() {
    let navigate = useNavigate();

  function handleStart() {
    navigate('/start');
  }

  return (
    <S.Container>
    <S.Bg />
    <S.Title><S.MoodTitle>MOOD</S.MoodTitle>BARCORD</S.Title>
    <S.Titletext>당신의 일상을 특별하게 <S.MoodText>표현</S.MoodText>하세요</S.Titletext>
    <StartPage />
    </S.Container>
  )
}
