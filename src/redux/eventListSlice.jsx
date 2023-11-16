import { createSlice } from "@reduxjs/toolkit";
import {format} from 'date-fns';

export const eventListSlice = createSlice({
    name: "eventList",
    initialState: {
		profileImgUrlList:["https://via.placeholder.com/150"],
		isRoomMaker : true,
		eventName : "이벤트 명",   
		startDate : `${format(new Date(), "yyyy-MM-dd")}`,   //Date의 형식은 2023-10-09, 2023-09-07 이런형식!!
		endDate : `${format(new Date(), "yyyy-MM-dd")}`,     //Date의 형식은 2023-10-09, 2023-09-07 이런형식!!
		loginUserId : "",
		userCount : 1,
		userInfo:
		[]
	},
    reducers: {
        setEventList: (state, action) => {
            state.profileImgUrlList = action.payload.profileImgUrlList;
			state.isRoomMaker = action.payload.isRoomMaker;
			state.eventName = action.payload.eventName;
			state.startDate = action.payload.startDate;
			state.endDate = action.payload.endDate;
			state.loginUserId = action.payload.loginUserId;
			state.userCount = action.payload.userCount;
			state.userInfo = action.payload.userInfo;
        }
    },
},
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
		}
	}
});

export const { setEventList,setMyEvent } = eventListSlice.actions;

export default eventListSlice.reducer;