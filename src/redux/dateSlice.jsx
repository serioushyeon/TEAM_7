import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const koreanDayofWeek = ["일", "월", "화", "수", "목", "금", "토"];

const initialCalendarState = {
  yearMonthDay: "",
  dayOfWeek: "",
  monthDay: "",
  month: "", // 월 정보를 저장할 필드 추가
  day: "",
};

export const dateSlice = createSlice({
  name: "date",
  initialState: initialCalendarState,
  reducers: {
    selectDate: (state, action) => {
      const date = action.payload; // action에서 전달된 일자
      state.yearMonthDay = date;
      state.dayOfWeek = koreanDayofWeek[moment(date).day()];
      state.monthDay = moment(date).format("MMDD");
      state.month = moment(date).format("MM"); // 월 정보 저장
      state.day = moment(date).format("DD"); // 일자만 추출
    },
  },
});

export const { selectDate } = dateSlice.actions;

export default dateSlice.reducer;
