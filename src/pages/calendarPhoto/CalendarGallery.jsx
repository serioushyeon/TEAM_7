import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCalendarData } from "../../redux/CalendarPhotoBoard";
import { S } from "./CGalleryStyle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CalendarBoard() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const dateInfo = useSelector((state) => state.date); // 한 번만 선언
  const dateDay = useSelector((state) => state.dateDay.dateDay);
  console.log("Date Info:", dateInfo); // 현재 상태 출력
  console.log('일 클릭(사진 O) : year: ', dateDay.year, 'month: ', dateDay.month, 'day: ', dateDay.day);

  // 데이터 불러오는 함수
  const fetchCalendarData = async () => {
    try {
      const response = await axios.get(`/api/v1/user/${date}`);
      if (response.data) {
        const { memo, images } = response.data;
        setMemo(memo);
        dispatch(setCalendarData({ memo, images }));
      } else {
        navigate("/calendar-photo");
      }
    } catch (error) {
      console.error("Error fetching data", error);
      navigate("/calendar-photo");
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, [dateInfo.yearMonthDay]);

  // edit 버튼 클릭하면 편집 활성화
  const [edit, setEdit] = useState(false);
  const [memo, setMemo] = useState("");
  const maxLength = 100;

  const handleMemoChange = (e) => {
    const value = e.target.value;

    setMemo(value);
  };

  const handleEditClick = () => {
    setEdit(!edit);
  };

  // 취소 버튼 클릭 시 캘린더로 이동
  function handleLocateCalendar() {
    navigate("/calendar");
  }

  return (
    <S.Container>
      <S.Bg>
        <S.DateContainer>
          <S.DayDayWeek>{dateInfo.month}월</S.DayDayWeek>
          <S.SmallText>
            <S.DayDateColor>
              {dateInfo.day}일, {dateInfo.dayOfWeek}
            </S.DayDateColor>
          </S.SmallText>
        </S.DateContainer>
        <S.GalleyText>
          <S.SettingText>사진첩</S.SettingText>
        </S.GalleyText>
        <S.HrLine />
        <S.DayPhotoConatiner>
          <S.DayPhotoBox />
          <S.DayPhotoBox />
          <S.DayPhotoBox />
          <S.DayPhotoBox />
        </S.DayPhotoConatiner>
        <S.DayMemoText>
          <S.SettingText>메모</S.SettingText>
        </S.DayMemoText>
        <S.EditButton onClick={handleEditClick} />
        <S.SecondHrLine />
        {edit ? (
          <S.DayMemoBox
            placeholder="아직 작성된 일상 메모가 없습니다."
            name="memo"
            value={memo}
            onChange={handleMemoChange}
            maxLength={100}
          />
        ) : (
          <S.DayMemoBox as="p" editable={edit}>
            {memo}
          </S.DayMemoBox>
        )}
        <S.StyledMaxLength
          editable={edit}
        >{`${memo.length}/${maxLength}`}</S.StyledMaxLength>
        <S.DayCancleButton>
          <S.CalendarButtonStyle onClick={handleLocateCalendar}>
            취소
          </S.CalendarButtonStyle>
        </S.DayCancleButton>
        <S.DaySaveButton>
          <S.CalendarButtonStyle>저장</S.CalendarButtonStyle>
        </S.DaySaveButton>
      </S.Bg>
    </S.Container>
  );
}
