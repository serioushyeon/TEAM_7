import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const koreanDayofWeek = ['일', '월', '화', '수', '목', '금', '토', '일'];

const dateState = {
    yearMonthDay: '',
    dayOfWeek: '',
    monthDay: '',
};

export const dateSlice = createSlice({
    name: "date",
    initialState: dateState,
    reducers: {
      selectDate: (state, action) => {
      const date = action.payload; // action에서 전달된 일자
      state.yearMonthDay = date;
      state.dayOfWeek = koreanDayofWeek[moment(date).day()];
      state.monthDay = moment(date).format('MMDD');
      }
   },
  });
  
  export const { selectDate } = dateSlice.actions;
  
  export default dateSlice.reducer;