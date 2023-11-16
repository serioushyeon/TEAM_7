import { createSlice } from "@reduxjs/toolkit";
import {format} from 'date-fns';

export const eventListSlice = createSlice({
    name: "eventList",
    initialState: {
		profileImgUrlList:["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"],
		isRoomMaker : true,
		eventName : "이벤트 명",   
		startDate : `${format(new Date(), "yyyy-MM-dd")}`,   //Date의 형식은 2023-10-09, 2023-09-07 이런형식!!
		endDate : `${format(new Date(), "yyyy-MM-dd")}`,     //Date의 형식은 2023-10-09, 2023-09-07 이런형식!!
		loginUserId : "123",
		userCount : 7,
		userInfo:
		[{
			userId: "123",
			nickname: "방장",
			imageList: ["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"],
			checkStatus: true,
			imageCount: 3
		},
		{
			userId: "456",
			nickname: "user2",
			imageList: ["https://via.placeholder.com/150","https://via.placeholder.com/150"],
			checkStatus: true,
			imageCount: 2
		},
		{
			userId: "789",
			nickname: "user3",
			imageList: ["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"],
			checkStatus: true,
			imageCount: 3
		},
		{
			userId: "000",
			nickname: "user4",
			imageList: ["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"],
			checkStatus: true,
			imageCount: 3
		},
		{
			userId: "111",
			nickname: "user5",
			imageList: ["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"],
			checkStatus: true,
			imageCount: 3
		},
		{
			userId: "222",
			nickname: "user7",
			imageList: ["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"],
			checkStatus: true,
			imageCount: 3
		},
		{
			userId: "333",
			nickname: "user8",
			imageList: ["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"],
			checkStatus: true,
			imageCount: 3
		},
	]
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
        },
		setEventName: (state, action) => {
			state.eventName = action.payload.eventName;
		},
		setEventDate: (state, action) => {
			state.startDate = action.payload.startDate;
			state.endDate = action.payload.endDate;
		}
    },
});

export const { setEventList,setEventName, setEventDate } = eventListSlice.actions;

export default eventListSlice.reducer;