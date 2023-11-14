import React from 'react'
import { S } from './PassportStyle';

export default function UserInfo() {
  return (
    <S.Container>
        <S.Bg>
          <S.BookBg>
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
          <S.Book2Container>
            <S.EditButton />
            <S.ProfileImage />
            <S.NickName>
            <S.Question>닉네임/Nick name</S.Question>
            <S.Answer>HIHI</S.Answer>
            </S.NickName>
            <S.Date>
              <S.Question>생일/Date of birth</S.Question>  
            <S.Answer>1999.09.10</S.Answer>
            </S.Date>
            <S.Sex>
            <S.Question>성별</S.Question>
            <S.Answer>M</S.Answer>
            </S.Sex>
            <S.UserBarcord />
          </S.Book2Container>
          </S.BookBg>
        </S.Bg>
    </S.Container>
  )
}
