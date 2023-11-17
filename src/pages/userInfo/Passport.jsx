import React from 'react'
import { S } from './PassportStyle';
import First from '../../components/useinfo/FirstInfo';
import Second from '../../components/useinfo/SecondInfo'


export default function Passport() {
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
