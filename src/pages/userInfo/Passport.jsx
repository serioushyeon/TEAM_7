import React from 'react'
import { S } from './PassportStyle';
import First from '../../components/useinfo/FirstInfo';
import Second from '../../components/useinfo/SecondInfo'

export default function Passport() {
  return (
    <S.Container>
        <S.Bg>
          <S.BookBg>
        <First />
        <Second />
          </S.BookBg>
        </S.Bg>
    </S.Container>
  )
}
