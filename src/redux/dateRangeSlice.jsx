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
            const { year, month } = action.payload;
            const startOfMonth = new Date(year, month - 1, 1);
            const endOfMonth = new Date(year, month, 0);
      
            const startDayOfWeek = startOfMonth.getDay() === 0 ? 6 : startOfMonth.getDay() - 1;
            const endDayOfWeek = endOfMonth.getDay() === 0 ? 0 : 7 - endOfMonth.getDay();
      
            const startOfCalendar = new Date(startOfMonth);
            startOfCalendar.setDate(startOfMonth.getDate() - startDayOfWeek);
      
            const endOfCalendar = new Date(endOfMonth);
            endOfCalendar.setDate(endOfMonth.getDate() + endDayOfWeek);
      
            const formatDate = (date) => date.toISOString().split('T')[0];
      
            state.dateRange.startDate = formatDate(startOfCalendar);
            state.dateRange.endDate = formatDate(endOfCalendar);
            state.dateRange.year = year;
            state.dateRange.month = month;
          }
    }

});

export const { setDateRange, updateDateRange } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;