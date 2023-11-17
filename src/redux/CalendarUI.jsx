import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // 현재 달의 첫 날짜를 표시한다.
    activeStartDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
    selected: false,
};

const calendarUISlice = createSlice({
    name: 'dateoption',
    initialState,
    reducers: {
        setActiveStartDate: (state, action) => {
            state.activeStartDate = action.payload;
        },
        toggleSelected: (state) => {
            state.selected = !state.selected;
        },
    },
});

export const { setActiveStartDate, toggleSelected } = calendarUISlice.actions;
export default calendarUISlice.reducer;