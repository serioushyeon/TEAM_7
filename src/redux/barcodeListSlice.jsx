import { createSlice } from "@reduxjs/toolkit";

export const barcodeListSlice = createSlice(
{
	name: "barcodeList",
	initialState: {
        barcodeList:
		[
            {
                id: "123",
                imageUrl: "https://via.placeholder.com/150",
                title: "2023-10-20"
            },
            {
                id: "456",
                imageUrl: "https://via.placeholder.com/150",
                title: "2023-10-21"
            },
            {
                id: "789",
                imageUrl: "https://via.placeholder.com/150",
                title: "2023-10-22"
            }
        ]
	},
	reducers: {
		setBarcodeList: (state, action) => {
			state.barcodeList = action.payload.barcodeList;
		}
	}
});

export const { setBarcodeList } = barcodeListSlice.actions;

export default barcodeListSlice.reducer;