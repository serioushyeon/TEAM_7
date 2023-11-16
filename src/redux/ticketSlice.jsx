import { createSlice } from "@reduxjs/toolkit";
import Icon from '../assets/images/MoodCloud/cloud1.png'
export const ticketSlice = createSlice(
{
	name: "ticket",
	initialState: {
        nickname:"String",
        title:"String",
        barcodeUrl:"String",
        startDate:"2028-03-11", //2023-09-10  //////09-10,2023(보류)
        endDate:"2028-03-11",   //2023-09-10  //////09-10,2023(보류)
        createdAt:"2028-03-11", //2023.09.08
        memberCnt: 0,
        imageInfoList: [
            {
                date:"2023-09-12", // 2023-09-10
                imageList: [Icon,Icon,Icon,Icon] 	//1~4개
            },
            {
                date:"2023-09-12", 
                imageList: [Icon,Icon]  	//1~4개
            },
            {
                date:"2023-09-13", 
                imageList: [Icon,Icon,Icon]  	//1~4개
            }
        ]
	},
	reducers: {
		setTicket: (state, action) => {
			state.title = action.payload.title;
            state.nickname = action.payload.nickname;
            state.barcodeUrl = action.payload.barcodeUrl;
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
            state.createdAt = action.payload.createdAt;
            state.memberCnt = action.payload.memberCnt;
            state.imageInfoList = action.payload.imageInfoList;
		}
	}
});

export const { setTicket } = ticketSlice.actions;

export default ticketSlice.reducer;