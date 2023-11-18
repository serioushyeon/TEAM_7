import { createSlice } from '@reduxjs/toolkit';
import Lion from '../assets/images/calendar/lion.png';
import Calendar1 from "../assets/images/calendar/Calendar1.svg";
import Background from "../assets/images/calendar/Background.svg";

// 31개의 빈 데이터를 포함하는 thumbnailInfoList 초기화
const initializeThumbnailInfoList = () => Array.from({ length: 31 }, () => ({
  thumbnailUrl: null,
  date: ""
}));

// 초기 상태 정의
const initialState = {
  thumbnailInfoList: initializeThumbnailInfoList(),
  buttonStatus: ""
};

// 슬라이스 생성
const calendarSlice = createSlice({
  name: 'photoList',
  initialState,
  reducers: {
    // 상태 업데이트
    setThumbnailInfoList: (state, action) => {
      state.thumbnailInfoList = action.payload;
    },
    // 버튼 상태 업데이트
    setButtonStatus: (state, action) => {
      state.buttonStatus = action.payload;
    }
  }
});

export const { setThumbnailInfoList, setButtonStatus } = calendarSlice.actions;
export default calendarSlice.reducer;