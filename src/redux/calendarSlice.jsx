import { createSlice } from '@reduxjs/toolkit';
import Lion from '../assets/images/calendar/lion.png';
import Calendar1 from "../assets/images/calendar/Calendar1.svg";
import Background from "../assets/images/calendar/Background.svg";

// 31개의 빈 데이터를 포함하는 thumbnailInfoList 초기화
// 임시 이미지만 우선 지정
const initializeThumbnailInfoList = () => Array.from({ length: 31 }, () => ({
  thumbnailUrl: "https://images.pexels.com/photos/12066797/pexels-photo-12066797.jpeg",
  date: "2023-11-11"
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
    }
  }
});

export const { setThumbnailInfoList } = calendarSlice.actions;
export default calendarSlice.reducer;