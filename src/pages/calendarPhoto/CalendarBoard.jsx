import React, { useState } from 'react'
import { S } from './CGalleryStyle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CalendarBoard() {
    let navigate = useNavigate();

    // 취소 버튼 클릭 시 캘린더로 이동
    function handleLocateCalendar() {
        navigate('/calendar');
      }

    const [dateOfWeek, setDateofWeek] = useState(); // 요일(ex. 일요일)
    const [date, setDate] = useState(); // 날짜(ex. 2023-11-01)
    const [photoCount, setPhotoCount] = useState(); // 올린 사진 카운트
    const [files, setFiles] = useState([]); // 파일 상태 추가

  return (
    <S.Container>
        <S.Bg> 
        <S.DayDayWeek>월</S.DayDayWeek>
        <S.SmallText><S.DayDateColor>2023, 11-01</S.DayDateColor></S.SmallText>
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
