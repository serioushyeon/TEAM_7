// src/features/event/eventSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventId: "",
  images: [],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventId: (state, action) => {
      state.eventId = action.payload;
    },
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
    removeImage: (state, action) => {
      const indexesToRemove = action.payload; // 선택된 이미지 인덱스 배열
      state.images = state.images.filter(
        (_, index) => !indexesToRemove.includes(index)
      );
    },
    clearImages: (state) => {
      state.images = [];
    },
    // 추가적인 리듀서 필요시 여기에 작성
  },
});

export const { setEventId, addImage, removeImage, clearImages } =
  eventSlice.actions;

export default eventSlice.reducer;
