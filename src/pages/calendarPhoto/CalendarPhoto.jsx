import React, { useState } from 'react'
import { S } from './CPhtoStyle';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CalendarPhoto() {
    let navigate = useNavigate();
     // 취소 버튼 클릭 시 캘린더로 이동
     function handleLocateCalendar() {
        navigate('/calendar');
      }

    const dateInfo = useSelector((state) => state.date);

    const [memo, setMemo] = useState(""); 
    const maxLength = 100;

      // 받은 데이터확인
    console.log(dateInfo);

    const handleMemoChange = (e) => {
        const value = e.target.value;

        setMemo(value);
    };

  return (
    <S.Container>
        <S.Bg> 
        <S.DayWeek>{dateInfo.dayOfWeek}</S.DayWeek>
        <S.SmallText><S.DateColor>{dateInfo.yearMonthDay}</S.DateColor></S.SmallText>
        <S.SettingPhoto><S.SettingText>사진 설정</S.SettingText></S.SettingPhoto>
        <S.AddPhotoBox>
            <S.CPhotoImage />
            <S.CPhotoText>4/4</S.CPhotoText>
            </S.AddPhotoBox>
        <S.SettingMemo><S.SettingText>메모</S.SettingText></S.SettingMemo>
        <S.MemoBox 
        placeholder="아직 작성된 일상 메모가 없습니다."
        name="memo"
        value={memo}
        onChange={handleMemoChange}
        maxLength={100} />
         <S.StyledMaxLength>{`${memo.length}/${maxLength}`}</S.StyledMaxLength>
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
