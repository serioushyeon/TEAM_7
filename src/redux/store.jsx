import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import themeReducer from "./theme";
import eventSlice from "./eventSlice";
import dateSlice from "./dateSlice";
import CalendarUI from "./CalendarUI";
import CalendarPhotoBoard from "./CalendarPhotoBoard";
import dateRangeSlice from "./dateRangeSlice";
import eventListSlice from "./eventListSlice";
import myEventSlice from "./myEventSlice";
import dateDaySlice from "./dateDaySlice";
import userInfoSlice from "./userInfoSlice";

// 여기서 데이터 관리해주세요.
export default configureStore({
  reducer: {
    user: userReducer,
    userdata: userInfoSlice,
    theme: themeReducer,
    event: eventSlice,
    date: dateSlice,
    calendarUI: CalendarUI,
    CalendarPhotoBoard: CalendarPhotoBoard,
    dateRange: dateRangeSlice,
    eventList: eventListSlice,
    myEvent: myEventSlice,
    dateDay: dateDaySlice
  },
});
