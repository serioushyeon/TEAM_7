import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import themeReducer from "./theme";
import eventSlice from "./eventSlice";
import dateSlice from "./dateSlice";
import CalendarUI from "./CalendarUI";

// 여기서 데이터 관리해주세요.
export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    event: eventSlice,
    date: dateSlice,
    calendarUI: CalendarUI,
  },
});
