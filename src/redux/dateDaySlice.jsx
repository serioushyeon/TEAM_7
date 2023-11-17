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
            },
            
        // 월 변경
    updateMonth: (state, action) => {
        const { month } = action.payload;
            state.dateDay.month = month + 1; 
      },
      // 년 변경
      updateYear: (state, action) => {
        const { year } = action.payload;
            state.dateDay.year = year;
      },
    }

});

export const { updateDay, updateMonth, updateYear } = dateDaySlice.actions;
export default dateDaySlice.reducer;