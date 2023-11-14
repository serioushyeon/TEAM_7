import React from 'react'
import { S } from './CPhtoStyle';

export default function CalendarPhoto() {
  return (
    <S.Container>
        <S.Bg>
        <S.DayWeek>일요일</S.DayWeek>
        <S.SmallText><S.DateColor>2023, 11-01</S.DateColor></S.SmallText>
        <S.SettingPhoto><S.SettingText>사진 설정</S.SettingText></S.SettingPhoto>
        <S.AddPhotoBox>
            <S.CPhotoImage />
            <S.CPhotoText>4/4</S.CPhotoText>
            </S.AddPhotoBox>
        <S.SettingMemo><S.SettingText>메모</S.SettingText></S.SettingMemo>
        <S.MemoBox>
            <S.SmallText><S.MemoColor>아직 작성된 일상 메모가 없습니다.</S.MemoColor></S.SmallText>
            </S.MemoBox>
        <S.CancleButton>
            <S.CalendarButtonStyle>취소</S.CalendarButtonStyle>
            </S.CancleButton>
        <S.SaveButton>
            <S.CalendarButtonStyle>저장</S.CalendarButtonStyle>
            </S.SaveButton>
        </S.Bg>
    </S.Container>
  )
}
