import React, { useState, useEffect } from "react";
import axios from "axios";
import { S } from "./PassportStyle";
import { useSelector, useDispatch } from "react-redux";
import { useCookies, Cookies } from "react-cookie";
import { userData } from "../../redux/userInfoSlice";
import Loading from "../../pages/loading/Loading";

import InfoBarcord from "../../assets/images/userinfo/infoBarcord.svg";
import Cloud from "../../assets/images/userinfo/cloud.svg";
import Profile from "../../assets/images/userinfo/profile.svg";
import { selectDate } from "../../redux/dateSlice";
import userInfoSlice from "../../redux/userInfoSlice";

export default function Passport() {
  const cookies = new Cookies();
  
  const [accessCookie] = useCookies(["accessCookie"]);
  const [refreshCookie] = useCookies(["refreshCookie"]);

  const getAccessCookie = localStorage.getItem("accessCookie");
  const getRefreshCookie = localStorage.getItem("refreshCookie");
  const loginDate = localStorage.getItem("LoginData");
  
  localStorage.setItem("accessCookie", cookies.access_cookie);
  localStorage.setItem("refreshCookie", cookies.refresh_cookie);

  // 더미데이터
  const DummyDate = {
    nickname: "KangSeungJun",
    birth: "1999-09-01",
    gender: "Y",
    dateOfIssue: "1999-09-01",
    barcodeCount: 4,
    profileImage: "https://cdn.aitimes.kr/news/photo/202303/27617_41603_044.jpg",
    recentBarcodeImg: "https://www.example.com/barcode.jpg",
    recentBarcodeTitleList: ["https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg", "Title 2", "Title 3"],
    modalActive: false,
  };

  const dispatch = useDispatch();

  // 리덕스(userData 대신 사용)
  const userInfo = useSelector((state) => state.userdata);

  const [edit, setEdit] = useState(false);
  const [fileState, setFileState] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  // file 저장

  // 로컬 상태 초기화
  const [user, setUser] = useState({
    nickname: "", // KangSeungJun
    birth: "", // 1999-09-01
    gender: "", // M or Y
    dateOfIssue: "", // 1999-09-01
    barcodeCount: "", //4
    profileImage: "", //https://www.ahdsfadsfafd~~~~ (url로 넘어갑니다!)
    recentBarcodeImg: "", // https://www.ahdsfadsfafd~~~~ (url로 넘어갑니다!)
    recentBarcodeTitleList: [], // String의 List로 넘어갑니다. 없으면 null
    modalActive: false,
  });

  const [loading, serLoading] = useState(true);

  // 유저 데이터 실시간 수정
  const handleInfoChange = (e, field) => {
    const updatedUser = { ...user, [field]: e.target.value };
    setUser(updatedUser);
    console.log(updatedUser);

    // userinfo로
    dispatch(userData(updatedUser));
  };

  // 유저 정보 get 메서드
  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/user/user-info`,
        {
          headers: {
            // 쿠키 보냄
            Authorization: `Bearer ${getAccessCookie}`,
          },
        }
      );
      console.log("성공, UserInfo : ", response.data);
      dispatch(userInfoSlice.actions.userData(response.data));
      setUser(response.data);

      // 데이터 재세팅

      if (response.data.modalActive === false) {
        alert("정보를 입력해주세요 !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 프로필 이미지 핸들러
  const handleProfileImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFileState(file);

      // 미리보기
      const objectUrl = URL.createObjectURL(file);

      setUser({ ...user, profileImage: objectUrl });

      dispatch(
        userData({
          ...userInfo,
          profileImage: objectUrl,
        })
      );

      console.log("image url: ", objectUrl);
      console.log(user.profileImage);
    }
  };

  // formData 전송, 편집 버튼 클릭 시
  const postUserInfo = async () => {
    const formData = new FormData();

    // 파일을 formdata로 전송
    formData.append("profileImage", fileState);

    formData.append("nickname", user.nickname);
    formData.append("birth", user.birth);
    formData.append("gender", user.gender);

    dispatch(userData(user));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/user/user-info`,
        formData,
        {
          headers: {
            // 쿠키 보냄, axios가 자동으로 Content-type 설정해줌.
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getAccessCookie}`,
          },
        }
      );
      console.log("성공 formData : ", response.data);

      setUser(prevUser => ({
        ...prevUser,
        profileImage: response.data.profileImage,
        nickname: response.data.nickname,
        birth: response.data.birth,
        gender: response.data.gender,
        dateOfIssue: response.data.dateOfIssue,
        modalActive: response.data.modalActive,
        recentBarcodeImg: response.data.recentBarcodeImg
      }));

      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
    } catch (error) {
      
    }
  };

  // 데이터 전송
  function handleEditUserInfo() {
    localStorage.setItem("nickname", userInfo.nickname);
    localStorage.setItem("birth", userInfo.birth);
    localStorage.setItem("gender", userInfo.gender);
    localStorage.setItem("profileImage", userInfo.profileImage);

    console.log('after user', user);
    console.log('after userInfo', userInfo);

    postUserInfo();
    setEdit(!edit);
  }

  useEffect(() => {
    dispatch(
      userData({
        ...userInfo, // 기존 userInfo 대신 user를 입력
        ...user, 
      })
    );
    console.log('Updated user:', user);
    console.log('Updated userInfo:', userInfo);
  }, [user]);

  function handleEdit() {
    setEdit(true);
  }

  return (
    <S.Bg>
      <S.BookBg />
    <S.TitleGoorm />
    <S.Title>MOOCO</S.Title>
    <S.Titletext>마이페이지</S.Titletext>

    <S.BookContainer>
      <S.CloudImage top="2.5rem" left="0.625rem">
              {!user.recentBarcodeTitleList[0] ? (
                <>
                </>
              ) :
              (
                  <S.BarcordImage>
                <S.Images src = {user.recentBarcodeTitleList[0]} />
                </S.BarcordImage>  
           )}
           </S.CloudImage>
            <S.CloudImage top="7.68rem" left="8.125rem">
              {!user.recentBarcodeTitleList[1] ? (
                <>
                </>
              ) :
              (
                <S.BarcordImage>
                <S.Images src = {user.recentBarcodeTitleList[1]} />
                </S.BarcordImage>
              )}
            </S.CloudImage>

            <S.CloudImage top="1rem" left="14.5rem">
              {!user.recentBarcodeTitleList[2] ? (
                <>
                </>
              ) :
              (
                <S.BarcordImage>
                <S.Images src = {user.recentBarcodeTitleList[2]} />
                </S.BarcordImage>
              )}
            </S.CloudImage>
          </S.BookContainer>

    <S.Book2Container>
      {!edit ? (
        <>
          <S.EditButton onClick={handleEdit} />
        </>
      ) : (
        <></>
      )}

      <S.ProfileBox>
        <S.Images src={user.profileImage} />
      </S.ProfileBox>
      {edit ? (
        <>
          <S.ProfileLabel htmlFor="profileImage">
            프로필 사진
            <br />
            변경
          </S.ProfileLabel>
        </>
      ) : (
        <></>
      )}
      <S.InputProfile
        type="file"
        id="profileImage"
        name="profileImage"
        onChange={handleProfileImageChange}
        disabled={!edit}
      />
      <S.NickName>
        <S.Question>닉네임/Nick name</S.Question>
        <S.Answer
          type="text"
          value={user.nickname}
          id="nickname"
          name="nickname"
          onChange={(e) => handleInfoChange(e, "nickname")}
          readOnly={!edit}
          edit={edit}
          maxLength={8}
          placeholder="이름을 입력해주세요."
        />
      </S.NickName>
      <S.Date>
        <S.Question>생일/Date of birth</S.Question>
        <S.Answer
          type="date"
          id="birth"
          name="birth"
          min="1900-01-01"
          max="2024-01-01"
          value={user.birth}
          placeholder="0000-00-00"
          onChange={(e) => handleInfoChange(e, "birth")}
          readOnly={!edit}
          edit={edit}
        />
      </S.Date>
      <S.Sex>
        <S.Question>성별</S.Question>
        {edit ? (
          <>
            <input
              type="radio"
              value="M"
              id="gender"
              name="gender"
              onChange={(e) => handleInfoChange(e, "gender")}
            />
            M
            <input
              type="radio"
              id="gender"
              value="Y"
              name="gender"
              onChange={(e) => handleInfoChange(e, "gender")}
            />
            Y
          </>
        ) : (
          <>
            <S.Answer
              type="text"
              value={
                user.gender === "M" ? "남성" : user.gender === "Y" ? "여성" : ""
              }
              readOnly
              edit={edit}
            />
          </>
        )}
      </S.Sex>
      <S.DateOfIssue>
        <S.Question readOnly>발급일/Date of issue</S.Question>
        {user.dateOfIssue}
      </S.DateOfIssue>
      <S.NunberBarcord>
        <S.Question readOnly>보유 바코드 수/Number</S.Question>
        {user.barcodeCount}
      </S.NunberBarcord>
      <S.UserBarcord>
        <S.Images src={user.recentBarcodeImg} />
      </S.UserBarcord>
      {edit ? (
        <>
          <S.SendButton type="submit" onClick={handleEditUserInfo}>
            저장
          </S.SendButton>
        </>
      ) : (
        <></>
      )}
    </S.Book2Container>
        </S.Bg>
  )
}