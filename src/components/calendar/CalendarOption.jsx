import { S } from "../../pages/calendar/CalendarStyle";
import React, { useState, useEffect } from "react";

// 월 변경 선택 시 startDate와 endDate를 서버로 보낸다.
export default function CalendarOption() {
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth(); // 월은 0부터 시작하므로, 표시할 때 1을 더한다.
  const [selected, setSelected] = useState(false);

  // date 객체가 자동으로 년, 월을 조절한다.
  const handleYearChange = (year) => {
    setDate(new Date(year, month, 1)); // 선택한 달의의 첫째날로 이동
    console.log("현재 날짜 : ", year, "-", month, "-");
  };

  const handleMonthChange = (month) => {
    setDate(new Date(year, month, 1)); // 선택한 달의의 첫째날로 이동
    console.log("현재 날짜 : ", year, "-", month, "-");
  };

  // 1월부터 12월까지 옵션 드롭다운 생성
  const getMonthOptions = () => {
    const options = [];

    for (let _month = 0; _month < 12; _month++) {
      const date = new Date(year, _month, 1);
      options.push(
        <S.StyledOptionsList key={_month} value={_month}>
          <S.StyledOptions
            onClick={() => {
              handleMonthChange(_month);
            }}
          >
            {date.toLocaleDateString("default", { month: "long" })}
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
              {year}
            </S.YearText>
            <S.StyledLeftButton
              onClick={() => {
                handleYearChange(year - 1);
              }}
              top="1rem"
              left="4.5rem"
            />
            <S.StyledRightButton
              onClick={() => {
                handleYearChange(year + 1);
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
        {year}.{month + 1}
      </S.YearText>
      <S.StyledLeftButton
        onClick={() => {
          handleMonthChange(month - 1);
        }}
        top="8.5rem"
        left="14.8rem"
      />
      <S.StyledRightButton
        onClick={() => {
          handleMonthChange(month + 1);
        }}
        top="8.5rem"
        left="16rem"
      />
    </>
  );
}
