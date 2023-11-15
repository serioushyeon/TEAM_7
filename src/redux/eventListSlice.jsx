import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
	profileImgUrlList:["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"],
	isRoomMaker : true,
	eventName : "경복궁 나들이",   
	startDate : "2023-10-09",   //Date의 형식은 2023-10-09, 2023-09-07 이런형식!!
	endDate : "2023-10-09",     //Date의 형식은 2023-10-09, 2023-09-07 이런형식!!
	loginUserId : "123",
	userCount : 3,
	userInfo:
	[
	  {
		userId : "123",
		nickname : "방장",
		imageUrlList:["https://via.placeholder.com/150","https://via.placeholder.com/150",],
		checkStatus : true,
		imageCount : 2
	  },
	  {	
		userId : "String",
		nickname : "String",
		imageUrlList:["https://via.placeholder.com/150"],
		checkStatus : false,
		imageCount : 1

	  },
	  {
		userId : "String",
		nickname : "String",
		imageUrlList:["https://via.placeholder.com/150","https://via.placeholder.com/150"],
		checkStatus : false,
		imageCount : 2

	  }
	]
  }

export const eventListSlice = createSlice({
    name: "eventList",
    initialState: {
		value: initialStateValue
	},
    reducers: {
        setEventList: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const { setEventList } = eventListSlice.actions;

export default eventListSlice.reducer;