import React from 'react'
import { S } from './Style';

export default function FirstInfo() {
  return (
    <S.BookContainer>
            <S.FirstCloud>
            <S.CloudImage />
            </S.FirstCloud>
            <S.SecondCloud>
            <S.CloudImage />
            </S.SecondCloud>
            <S.ThirdCloud>
            <S.CloudImage />
            </S.ThirdCloud>
          </S.BookContainer>
  )
}
