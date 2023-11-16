import { createSlice } from "@reduxjs/toolkit";
import InfoBarcord from "../assets/images/userinfo/infoBarcord.svg";
import Cloud from "../assets/images/userinfo/cloud.svg";
import Profile from "../assets/images/userinfo/profile.svg";

// 여권 페이지에 유저 정보 
const userInfoState = {
    nickName: "none",
    birth: "0000-00-00",
    gender: "none",
    dateOfIssue: "0000-00-00",
    barcodeCount: 0,
    profileImage: `${Profile}`,
    recentBarcodeImg: `${InfoBarcord}`,
    recentBarcodeTitleList: [`${Cloud}`, `${Cloud}`, `${Cloud}`],
    modalActive: false,
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