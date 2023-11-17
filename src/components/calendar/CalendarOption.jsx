import { S } from '../../pages/calendar/CalendarStyle';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setActiveStartDate, toggleSelected } from '../../redux/CalendarUI';
import dateDaySlice, { updateDay, updateMonth, updateYear } from '../../redux/dateDaySlice';
import { updateDateRange } from '../../redux/dateRangeSlice';

// 월 변경 선택 시 startDate와 endDate를 서버로 보낸다.
export default function CalendarOption() {
    const [newDay, setNewDay] = useState(moment().day());
    const [newYear, setNewYear] = useState(moment().year());
    const [newMonth, setNewMonth] = useState(moment().month());
    const selected = useSelector((state) => state.calendarUI.selected);
    const dateDay = useSelector((state) => state.dateDay.dateDay);

    useEffect(() => {
      // 들어올 때 new일자들을 변경한 dateDay 값으로 업데이트
      setNewYear(dateDay.year);
      setNewMonth(dateDay.month);
      setNewDay(dateDay.day);
    }, []);

  const dispatch = useDispatch();

  // 월 버튼 클릭 핸들러
  const handleButtonClick = () => {
    dispatch(toggleSelected());
  }

   // 년도 변경 핸들러
const handleYearChange = (year) => {
  console.log('year', year);
  setNewYear(year);
  dispatch(updateYear(year));
  updateActiveStartDate(year, newMonth);
  dispatch(updateDateRange({ year, newMonth}));

  console.log('년 변경 : year: ', dateDay.year, 'month: ', dateDay.month, 'day: ', dateDay.day);
};

// 월 변경 핸들러
const handleMonthChange = (month) => {
  let year = newYear

  if (month > 11) {
    month = 0; // 12월 다음은 1월
    year = year + 1; // 다음 해로 변경
  } else if (month <0) {
    month = 11; // 1월 이전은 12월
    year = year - 1; // 이전 해로 변경
  }

  setNewMonth(month);
  setNewYear(year);
  updateActiveStartDate(year, month);
  dispatch(updateDateRange({ year, month}));
  dispatch(updateYear(year));
  dispatch(updateMonth(month));

  console.log('월 변경 : year: ', dateDay.year, 'month: ', dateDay.month, 'day: ', dateDay.day);
};

  // 날짜 변경 핸들러
  const updateActiveStartDate = (year, month) => {
    dispatch(setActiveStartDate(new Date(year, month).toISOString()));
  };

  // 월 선택 드롭다운
  const getMonthOptions = () => {
    const options = [];

    for (let month = 0; month < 12; month++) {
      const date = new Date(newYear, month, 1);
      options.push(
        <S.StyledOptionsList key={month} value={month}>
          <S.StyledOptions onClick={() => 
          { handleMonthChange(month);
            handleButtonClick();}}>
            {date.toLocaleDateString('default', { month: 'long' })}
            </S.StyledOptions>
        </S.StyledOptionsList>
      );
    }
    return options;
  };

  useEffect(() => {
    // 업데이트 후 dateDay 값에 새로 선택한 값 입력
    dispatch(updateYear({ year: newYear }));
    dispatch(updateMonth({ month: newMonth}));
    dispatch(updateDay({day: newDay}));

    console.log('year: ', newYear, 'month: ', newMonth, 'day: ', newDay);
    console.log('dateDay year: ', dateDay.year, 'month: ', dateDay.month, 'day: ', dateDay.day);
  }, [dateDay]);

  return (
    <>
        <S.StyledSelect onChange={handleMonthChange} onClick={handleButtonClick}>Month</S.StyledSelect>
          <S.StyledOptionsBox show={selected ? "true" : undefined}>
            <S.StyledYear>
            <S.YearText
            top="0.6rem"
            left="6.3rem"
            >{dateDay.year}</S.YearText>
          <S.StyledLeftButton 
          onClick={() => handleYearChange(newYear - 1)}
          top="1rem"
          left="4.5rem" />
          <S.StyledRightButton 
          onClick={() => handleYearChange(newYear + 1)}
          top="1rem"
          left="9.8rem" />
          </S.StyledYear>
          <S.StyledMonth>
        {getMonthOptions()}
        </S.StyledMonth>
        </S.StyledOptionsBox>
        <S.YearText
            top="8rem"
            left="18rem"
            >{dateDay.year}.{dateDay.month + 1}</S.YearText>
        <S.StyledLeftButton 
        onClick={() => handleMonthChange(newMonth - 1)}
        top="8.5rem"
        left="14.8rem" />
        <S.StyledRightButton 
        onClick={() => handleMonthChange(newMonth + 1)}
        top="8.5rem"
        left="16rem" />
    </>
  )
}

