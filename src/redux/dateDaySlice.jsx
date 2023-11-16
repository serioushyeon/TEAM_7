import { createSlice } from "@reduxjs/toolkit";

// 오늘 날짜 지정
const today = new Date();
const initialDateState = {
    dateDay: { 
        year: today.getFullYear(),
        month: today.getMonth(), // 월은 0부터 시작한다.
        day: today.getDate()
    }
};

export const dateDaySlice = createSlice({
    name: 'dateDay',
    initialState: initialDateState,
    reducers: {
        // 일 변경
        updateDay: (state, action) => {
            const { day } = action.payload;
            state.dateDay.day = day;
/* 유효성 검사
    let newYear = parseInt(state.dateDay.year, 10); // 문자열을 숫자로 변환
    let newMonth = parseInt(state.dateDay.month, 10); // 문자열을 숫자로 변환
    let newDay = day;


  const lastDayOfMonth = new Date(newYear, newMonth + 1, 0).getDate();

  if (newDay > lastDayOfMonth) {
    newDay = 1;
    newMonth += 1;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
  } else if (newDay < 1) {
    newMonth -= 1;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    newDay = new Date(newYear, newMonth + 1, 0).getDate();
  }

  state.dateDay = { year: newYear, month: newMonth, day: newDay };
  */
            },
            
        // 월 변경
    updateMonth: (state, action) => {
        const { month } = action.payload;
            state.dateDay.month = month; 
  
            /*
        let newMonth = month;
        let newYear = year;
  
        if (newMonth > 11) {
          newMonth = 0;
          newYear += 1;
        } else if (newMonth < 0) {
          newMonth = 11;
          newYear -= 1;
        }
  
        state.dateDay = { ...state.dateDay, year: newYear, month: newMonth };
        */
      },
      // 년 변경
      updateYear: (state, action) => {
        const { year } = action.payload;
            state.dateDay.year = year;
            /*
        let newYear = year;

        state.dateDay = { ...state.dateDay, year: newYear };
        */
      },
    }

});

export const { updateDay, updateMonth, updateYear } = dateDaySlice.actions;
export default dateDaySlice.reducer;