import { S } from "../../pages/calendar/CalendarStyle";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMonth,
  updateYear,
  setActiveStartDate,
} from "../../redux/dateDaySlice";

// 월 변경 선택 시 startDate와 endDate를 서버로 보낸다.
export default function CalendarOption() {
  const dispatch = useDispatch();
  const dateRedux = useSelector((state) => state.dateDay); // redux의 dateDay 상태
  console.log("redux activeStartDate: ", dateRedux.activeStartDate);

  const [selected, setSelected] = useState(false);

  // date 객체가 자동으로 년, 월을 조절한다.
  // 월은 0부터 시작하므로, 표시할 때 1을 더한다.
  const handleYearChange = (year) => {
    // 새로운 날짜로 업데이트 후 리덕스에 저장한다.
    const newDate = new Date(year, dateRedux.month, 1);
    handleDateChange(newDate);
  };

  const handleMonthChange = (month) => {
    const newDate = new Date(dateRedux.year, month, 1);
    handleDateChange(newDate);
  };

  // { newDate }는 객체로 전달해야한다.
  const handleDateChange = (newDate) => {
    dispatch(updateYear({ year: newDate.getFullYear() }));
    dispatch(updateMonth({ month: newDate.getMonth() }));
    dispatch(setActiveStartDate({ newDate }));
  };

  // 1월부터 12월까지 옵션 드롭다운 생성
  const getMonthOptions = () => {
    const options = [];

    for (let _month = 0; _month < 12; _month++) {
      const dateOption = new Date(dateRedux.year, _month, 1);
      options.push(
        <S.StyledOptionsList key={_month} value={_month}>
          <S.StyledOptions
            onClick={() => {
              handleMonthChange(_month);
            }}
          >
            {dateOption.toLocaleDateString("default", { month: "long" })}
          </S.StyledOptions>
        </S.StyledOptionsList>
      );
    }
    return options;
  };

  const handleDropdown = () => {
    setSelected(!selected);
  };

  return (
    <>
      <S.StyledSelect onChange={handleMonthChange} onClick={handleDropdown}>
        Month
      </S.StyledSelect>
      {selected ? (
        <S.StyledOptionsBox>
          <S.StyledYear>
            <S.YearText top="0.6rem" left="6.3rem">
              {dateRedux.year}
            </S.YearText>
            <S.StyledLeftButton
              onClick={() => {
                handleYearChange(dateRedux.year - 1);
              }}
              top="1rem"
              left="4.5rem"
            />
            <S.StyledRightButton
              onClick={() => {
                handleYearChange(dateRedux.year + 1);
              }}
              top="1rem"
              left="9.8rem"
            />
          </S.StyledYear>
          <S.DeleteButton onClick={handleDropdown} />
          <S.StyledMonth>{getMonthOptions()}</S.StyledMonth>
        </S.StyledOptionsBox>
      ) : (
        <></>
      )}
      <S.YearText top="8rem" left="18rem">
        {dateRedux.year}.{dateRedux.month + 1}
      </S.YearText>
      <S.StyledLeftButton
        onClick={() => {
          handleMonthChange(dateRedux.month - 1);
        }}
        top="8.5rem"
        left="14.8rem"
      />
      <S.StyledRightButton
        onClick={() => {
          handleMonthChange(dateRedux.month + 1);
        }}
        top="8.5rem"
        left="16rem"
      />
    </>
  );
}
