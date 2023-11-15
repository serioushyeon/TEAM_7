import React from 'react'
import { S } from '../Login/LoginStyle';
import StartPage from '../../components/startpage/StartPage'

export default function SubStart() {

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
