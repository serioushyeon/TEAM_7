import React, { useState } from 'react'
import { S } from '../../pages/calendar/CalendarStyle';
import moment from 'moment';
import formatDate from './FormatDate';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/dateSlice';
import { setActiveStartDate, toggleSelected } from '../../redux/CalendarUI';
import { updateDateRange } from '../../redux/dateRangeSlice';
import dateDaySlice, { updateDay, updateMonth, updateYear } from '../../redux/dateDaySlice';
import { useNavigate } from "react-router-dom";

export default function PhotoOption() {
    const dateDay = useSelector((state) => state.dateDay.dateDay);
    const dateInfo = useSelector((state) => state.date);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // 일 변경 핸들러
const handleDayChange = (day) => {

    let newYear = dateDay.year;
    let newMonth = dateDay.month;
    let selectedDay = day;

    const lastDayOfMonth = new Date(newYear, newMonth + 1, 0).getDate();

    // 날짜가 월의 범위를 벗어날 때만 월을 변경
    if (selectedDay > lastDayOfMonth) {
      selectedDay = 1;
      newMonth += 1;
    } else if (selectedDay < 1) {
      newMonth -= 1;
      selectedDay = new Date(newYear, newMonth + 1, 0).getDate();
    }

      // 년도 및 월 업데이트
    if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      } else if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

    dispatch(updateYear({ year: newYear }));
    dispatch(updateMonth({ month: newMonth}));
    dispatch(updateDay({day: selectedDay}));

    // 변환된 날짜를 다른 리덕스 액션에 dispatch
    const formattedDate = formatDate(newYear, newMonth, selectedDay);
    console.log('fomattedDate', formattedDate);
    dispatch(selectDate(formattedDate));
    navigate(`/calendar-photo/${formattedDate}`);

    

    console.log('일 변경 : year: ', dateDay.year, 'month: ', dateDay.month, 'day: ', dateDay.day);
  };

  return (
    <div>
      <S.StyledLeftButton 
        onClick={() => handleDayChange(dateDay.day - 1)}
        top="3.3rem"
        left="9.2rem" />
        <S.StyledRightButton 
        onClick={() => handleDayChange(dateDay.day + 1)}
        top="3.3rem"
        left="14.2rem" />
    </div>
  )
}
