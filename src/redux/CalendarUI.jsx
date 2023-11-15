import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeStartDate: new Date().toISOString(),
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