import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    barcodeList:
    []
}
export const barcodeListSlice = createSlice(
{
	name: "barcodeList",
	initialState: {
        value : initialstate
	},
	reducers: {
		setBarcodeList: (state, action) => {
			state.value = action.payload;
		}
	}
});

export const { setBarcodeList } = barcodeListSlice.actions;

export default barcodeListSlice.reducer;