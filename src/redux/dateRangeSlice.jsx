import { createSlice } from "@reduxjs/toolkit";

const initialDateState = {
    dateRange: { 
        startDate: '',
        endDate: '',
        year: '',
        month: ''
    }
};

export const dateRangeSlice = createSlice({
    name: 'dateRange',
    initialState: initialDateState,
    reducers: {
        // 날짜의 전체 범위 설정
        updateDateRange: (state, action) => {
            let { year, month } = action.payload;
            month += 1;

            const startOfMonth = new Date(year, month - 1, 1); // 월에서 1을 빼서 Date 객체에 전달
            const endOfMonth = new Date(year, month, 0); // 다음 달의 0번째 날짜는 이번 달의 마지막 날짜임
        
            const startDayOfWeek = startOfMonth.getDay() === 0 ? 6 : startOfMonth.getDay() - 1;
            const endDayOfWeek = endOfMonth.getDay() === 0 ? 0 : 6 - endOfMonth.getDay();
        
            const startOfCalendar = new Date(startOfMonth);
            startOfCalendar.setDate(startOfMonth.getDate() - startDayOfWeek);
        
            const endOfCalendar = new Date(endOfMonth);
            endOfCalendar.setDate(endOfMonth.getDate() + endDayOfWeek);
        
            const formatDate = (date) => {
              const adjustedMonth = date.getMonth() + 1; // 실제 월 표시를 위해 1 증가
              const day = date.getDate();
              return `${date.getFullYear()}-${adjustedMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            };
        
            state.dateRange.startDate = formatDate(startOfCalendar);
            state.dateRange.endDate = formatDate(endOfCalendar);
            state.dateRange.year = year;
            state.dateRange.month = month; // 실제 월 저장
          }
        }

});

export const { updateDateRange } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;