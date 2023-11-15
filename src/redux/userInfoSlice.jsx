import { createSlice } from "@reduxjs/toolkit";

const userInfoState = {
    nickName: "",
    birth: "",
    gender: "",
    dateOfIssue: "",
    barcodeCount: 0,
    profileImage: "",
    recentBarcodeImg: "",
    recentBarcodeTitleList: [],
    modalActive: true,
};

export const userInfoSlice = createSlice({
    name: "userdata",
    initialState: userInfoState,
    reducers: {
      userData: (state, action) => {
      state.nickName = action.payload.nickName;
      state.birth = action.payload.birth;
      state.gender = action.payload.gender;
      state.dateOfIssue = action.payload.dateOfIssue;
      state.barcodeCount = action.payload.barcodeCount;
      state.profileImage = action.payload.profileImage;
      state.recentBarcodeImg = action.payload.recentBarcodeImg;
      state.recentBarcodeTitleList = action.payload.recentBarcodeTitleList;
      state.modalActive = action.payload.modalActive;
      }
   },
  });

  export const { userData } = userInfoSlice.actions;
  export default userInfoSlice.reducer;