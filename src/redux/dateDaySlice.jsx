import { createSlice } from "@reduxjs/toolkit";

// 오늘 날짜 지정
const today = new Date();
const initialDateState = {
  year: today.getFullYear(),
  month: today.getMonth(), // 월은 0부터 시작한다.
  day: today.getDate(),
  // 리덕스는 비직렬화 데이터를 저장할 수 없다. (ex. date)
};

export const dateDaySlice = createSlice({
  name: "dateDay",
  initialState: initialDateState,
  reducers: {
    // 일 변경
    updateDay: (state, action) => {
      const { day } = action.payload;
      state.day = day;
    },

    // 월 변경
    updateMonth: (state, action) => {
      const { month } = action.payload;
      state.month = month;
    },
    // 년 변경
    updateYear: (state, action) => {
      const { year } = action.payload;
      state.year = year;
    },
  },
});

export const { updateDay, updateMonth, updateYear } = dateDaySlice.actions;
export default dateDaySlice.reducer;
