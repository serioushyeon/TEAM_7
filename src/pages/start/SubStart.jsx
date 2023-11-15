import React from 'react'
import { S } from '../Login/LoginStyle';
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
    <S.TitleGoorm />
    <S.Title>MOOCO</S.Title>
        <S.Titletext>무드를 표현하는 새로운 방법, 무코</S.Titletext>
    <StartPage />
    </S.Container>
  )
}
