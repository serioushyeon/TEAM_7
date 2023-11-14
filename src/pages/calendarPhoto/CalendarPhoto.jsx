import React, { useState } from 'react'
import { S } from './CPhtoStyle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CalendarPhoto() {
    let navigate = useNavigate();
    const [dateOfWeek, setDateofWeek] = useState(); // 요일(ex. 일요일)
    const [date, setDate] = useState(); // 날짜(ex. 2023-11-01)
    const [photoCount, setPhotoCount] = useState(); // 올린 사진 카운트
    const [files, setFiles] = useState([]); // 파일 상태 추가

    // 취소 버튼 클릭 시 캘린더로 이동
    function handleLocateCalendar() {
        navigate('/calendar');
      }

  return (
    <S.Container>
        <S.Bg> 
        <S.DayWeek>일요일</S.DayWeek>
        <S.SmallText><S.DayDateColor>2023, 11-01</S.DayDateColor></S.SmallText>
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
            <S.CalendarButtonStyle onClick={handleLocateCalendar}>취소</S.CalendarButtonStyle>
            </S.CancleButton>
        <S.SaveButton>
            <S.CalendarButtonStyle>저장</S.CalendarButtonStyle>
            </S.SaveButton>
        </S.Bg>
    </S.Container>
  )
}
