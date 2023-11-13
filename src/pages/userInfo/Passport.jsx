import React from 'react'
import { S } from './PassportStyle';

export default function Passport() {
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
            <S.DateOfIssue>
            <S.Question>발급일/Date of issue</S.Question>
            <S.Answer>1999.09.30</S.Answer>
            </S.DateOfIssue>
            <S.NunberBarcord>
            <S.Question>보유 바코드 수/Number</S.Question>
            <S.Answer>4</S.Answer>
            </S.NunberBarcord>
            <S.UserBarcord />
          </S.Book2Container>
          </S.BookBg>
        </S.Bg>
    </S.Container>
  )
}
