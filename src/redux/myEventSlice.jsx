import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	existEvent : false,
	eventId: ""};
	
export const myEventSlice = createSlice(
{
	name: "myEvent",
	initialState: {
		value: initialState
	},
	reducers: {
		setMyEvent: (state, action) => {
			state.value = action.payload;
		},
		setEventId: (state, action) => {
			state.value.eventId = action.payload.eventId;
		}

	}
});

export const { setMyEvent,setEventId } = myEventSlice.actions;

export default myEventSlice.reducer;