import React, { useState } from "react";
import { S } from "../../pages/calendar/CalendarStyle";
import formatDate from "./FormatDate";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateDay, updateMonth, updateYear } from "../../redux/dateDaySlice";
import { useNavigate } from "react-router-dom";

export default function PhotoOption(date) {
  const dateRedux = useSelector((state) => state.dateDay); // redux의 dateDay 상태

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 날짜 문자열을 반환하는 함수
  const parseDate = (date) => {
    const [year, month, day] = date.split("-").map(Number);

    return { year, month, day };
  };

  // 일 변경 핸들러
  const handleDayChange = (add) => {
    const days = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];

    const { year, month, day } = parseDate(date.date);
    const newDay = day + add;

    // 새로운 날짜 객체 생성, Date 객체는 자동으로 날짜를 조정해준다.
    // month는 0부터 시작이기 때문에 -1을 해준다.
    const newDate = new Date(year, month - 1, newDay);

    const dayOfWeek = days[newDate.getDay()];

    // Redux store 업데이트
    dispatch(updateYear({ year: newDate.getFullYear() }));
    dispatch(updateMonth({ month: newDate.getMonth() }));
    dispatch(updateDay({ day: newDate.getDay() }));

    const formattedDate = formatDate(newDate);

    navigate(`/calendar-photo/${formattedDate}`, {
      state: { dayOfWeek },
    });
  };

  return (
    <div>
      <S.StyledLeftButton
        onClick={() => handleDayChange(-1)}
        top="3.3rem"
        left="9.2rem"
      />
      <S.StyledRightButton
        onClick={() => handleDayChange(+1)}
        top="3.3rem"
        left="14.2rem"
      />
    </div>
  );
}
