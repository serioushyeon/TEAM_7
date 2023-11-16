import { createSlice } from "@reduxjs/toolkit";

export const myEventSlice = createSlice(
{
	name: "myEvent",
	initialState: {
		isExistEvent : true,
		eventId: "123"
	},
	reducers: {
		setMyEvent: (state, action) => {
			state.isExistEvent = action.payload.isExistEvent;
			state.eventId = action.payload.eventId;
		}
	}
});

export const { setMyEvent } = myEventSlice.actions;

export default myEventSlice.reducer;