import { createSlice } from "@reduxjs/toolkit";
import Icon from '../assets/images/MoodCloud/cloud1.png'

const initialstate = {
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
};
export const ticketSlice = createSlice(
{
	name: "ticket",
	initialState: {
        value : initialstate
	},
	reducers: {
		setTicket: (state, action) => {
			state.value = action.payload;
		}
	}
});

export const { setTicket } = ticketSlice.actions;

export default ticketSlice.reducer;