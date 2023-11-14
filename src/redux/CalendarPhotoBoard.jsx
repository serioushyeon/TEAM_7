import { createSlice } from "@reduxjs/toolkit";

export const CalendarPhotoBoard = createSlice({
  name: "calendarData",
  initialState: {
    memo: "",
    images: [],
  },
  reducers: {
    setCalendarData: (state, action) => {
      state.memo = action.payload.memo;
      state.images = action.payload.images;
    },
  },
});

export const { setCalendarData } = CalendarPhotoBoard.actions;

export default CalendarPhotoBoard.reducer;
