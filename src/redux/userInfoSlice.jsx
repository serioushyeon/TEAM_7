import { createSlice } from "@reduxjs/toolkit";
import InfoBarcord from "../assets/images/userinfo/infoBarcord.svg";
import Cloud from "../assets/images/userinfo/cloud.svg";
import Profile from "../assets/images/userinfo/profile.svg";

// 여권 페이지에 유저 정보 
const userInfoState = {
    nickname: "",
    birth: "",
    gender: "",
    dateOfIssue: "",
    barcodeCount: 0,
    profileImage: "",
    recentBarcodeImg: "",
    recentBarcodeTitleList: ["", "", ""],
    modalActive: false,
};

export const userInfoSlice = createSlice({
    name: "userdata",
    initialState: {value : userInfoState},
    reducers: {
      setUserData: (state, action) => {
        state.value = action.payload;
      }
   },
  });

  export const { setUserData } = userInfoSlice.actions;
  export default userInfoSlice.reducer;