import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const initialState = {
  profileImgUrlList: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ],
  roomMaker: true,
  eventName: "",
  startDate: `${format(new Date(), "yyyy-MM-dd")}`, //Date의 형식은 2023-10-09, 2023-09-07 이런형식!!
  endDate: `${format(new Date(), "yyyy-MM-dd")}`, //Date의 형식은 2023-10-09, 2023-09-07 이런형식!!
  loginUserId: "",
  userCount: 0,
  userInfo: [
    {
      userId: "123",
      nickname: "방장",
      imageList: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
      checkStatus: true,
      imageCount: 30,
    },
    {
      userId: "456",
      nickname: "user2",
      imageList: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
      checkStatus: true,
      imageCount: 40,
    },
  ],
};

export const eventListSlice = createSlice({
  name: "eventList",
  initialState: {
    value: initialState
  },
  reducers: {
    setEventList: (state, action) => {
      state.value = action.payload;
    },
    setEventName: (state, action) => {
      state.value.eventName = action.payload;
    },
    setEventDate: (state, action) => {
      state.value.startDate = action.payload.startDate;
      state.value.endDate = action.payload.endDate;
    },
  },
});

export const { setEventList, setEventName, setEventDate } =
  eventListSlice.actions;

export default eventListSlice.reducer;
