import { createSlice } from "@reduxjs/toolkit";

export const myEventSlice = createSlice(
{
	name: "myEvent",
	initialState: {
		isExistEvent : false,
		eventId: ""
	},
	reducers: {
		setMyEvent: (state, action) => {
			state.isExistEvent = action.payload.isExistEvent;
			state.eventId = action.payload.eventId;
		},
		setEventId: (state, action) => {
			state.eventId = action.payload.eventId;
		}

	}
});

export const { setMyEvent,setEventId } = myEventSlice.actions;

export default myEventSlice.reducer;