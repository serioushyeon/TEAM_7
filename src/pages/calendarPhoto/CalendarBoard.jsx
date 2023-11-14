import React, { useState } from 'react'
import { S } from './CGalleryStyle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CalendarBoard() {
    let navigate = useNavigate();

    // 취소 버튼 클릭 시 캘린더로 이동
    function handleLocateCalendar() {
        navigate('/calendar');
      }
      const dateInfo = useSelector((state) => state.date);

  return (
    <S.Container>
        <S.Bg> 
        <S.DayDayWeek>{dateInfo.dayOfWeek}</S.DayDayWeek>
        <S.SmallText><S.DayDateColor>{dateInfo.yearMonthDay}</S.DayDateColor></S.SmallText>
        <S.GalleyText><S.SettingText>사진첩</S.SettingText></S.GalleyText>
        <S.HrLine />
        <S.DayPhotoConatiner>
            <S.DayPhotoBox />
            <S.DayPhotoBox />
            <S.DayPhotoBox />
            <S.DayPhotoBox />
        </S.DayPhotoConatiner>
        <S.DayMemoText><S.SettingText>메모</S.SettingText></S.DayMemoText>
        <S.SecondHrLine />
        <S.DayMemoBox>
            <S.SmallText><S.MemoColor>아직 작성된 일상 메모가 없습니다.</S.MemoColor></S.SmallText>
            </S.DayMemoBox>
        <S.DayCancleButton>
            <S.CalendarButtonStyle
            onClick={handleLocateCalendar}>취소</S.CalendarButtonStyle>
            </S.DayCancleButton>
        <S.DaySaveButton>
            <S.CalendarButtonStyle>저장</S.CalendarButtonStyle>
            </S.DaySaveButton>
        </S.Bg>
    </S.Container>
  )
}
