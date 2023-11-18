import React, { useState, useEffect } from "react";
import axios from "axios";
import { S } from "./Style";
import { apiClient } from "../../api/ApiClient";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { BsCalendarHeart, BsCalendarWeek } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { setUserData } from "../../redux/userInfoSlice";
import { useDispatch } from "react-redux";
import userBarcord from "../../assets/images/userinfo/SubStartBar.png";
import defaultProfileImage from "../../assets/images/userinfo/SubStartPro.png";
// import { userData } from "./userData";

export default function Second() {
  /*const [cookies] = useCookies(["accessCookie", "refreshCookie"]);
  const accessCookie = cookies.accessCookie;
  const refreshCookie = cookies.refreshCookie;


//   localStorage.setItem("accessCookie", accessCookie);
//   localStorage.setItem("refreshCookie", refreshCookie);

  localStorage.setItem("accessCookie", cookies.accessCookie);
  localStorage.setItem("refreshCookie", cookies.refreshCookie);*/

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dispatch = useDispatch();

  const getAccessCookie = localStorage.getItem("accessCookie");
  const getRefreshCookie = localStorage.getItem("refreshCookie");

  const defaultpro = "../../assets/images/userinfo/SubStartPro.png";

  const displayProfileImage = () => {
    return userInfo && userInfo.profileImage
      ? userInfo.profileImage
      : defaultProfileImage;
  };

  // 리덕스(userData 대신 사용)
  // const userInfo = useSelector((state) => state.userdata);
  // console.log("userInfo: ", userInfo);

  const [edit, setEdit] = useState(false);
  const [fileState, setFileState] = useState("");

  const [loading, setLoading] = useState(true);

  const userInfo = useSelector((state) => state.userdata.value);

  /*// 로컬 상태 초기화
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
  }); */

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
      console.log("성공 : ", response.data);
      // dispatch(userInfoSlice.actions.userData(response.data));
      // setUser(response.data);

      // return하면 상태에 저장했던 데이터가 생길거죠
      return response.data;

      // 데이터 재세팅

      /*  if (response.data.modalActive === false) {
        alert("정보를 입력해주세요 !");
      }
      */
    } catch (error) {
      console.log(error);
    }
  };

  // redux와 user 동기화
  useEffect(() => {
    const { data } = getUserInfo();
    // 데이터를 메서드로 따로 받은 후 세팅한다.
    dispatch(setUserData(data));
  }, []);

  // 프로필 이미지 핸들러
  const handleProfileImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFileState(file);

      // 미리보기
      const objectUrl = URL.createObjectURL(file);

      // setUser((user) => fileState && ({ ...user, profileImage: objectUrl }));

      console.log("image url: ", objectUrl);
      // console.log(user.profileImage);
    }
  };

  // 401
  // formData 전송, 편집 버튼 클릭 시
  const postUserInfo = async () => {
    const formData = new FormData();

    // 파일을 formdata로 전송
    formData.append("profileImage", fileState);

    formData.append("nickname", userInfo.nickname);
    formData.append("birth", userInfo.birth);
    formData.append("gender", userInfo.gender);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/user/user-info`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getAccessCookie}`,
          },
        }
      );
      console.log("성공 formData : ", response.data);

      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
    } catch (error) {
      console.error("실패 error : ", error);
    }
  };

  // // 유저 데이터 실시간 수정
  // const handleInfoChange = (e, field) => {
  //   const updatedUser = { ...userInfo, [field]: e.target.value };
  //   //setUser(updatedUser);
  //   dispatch(setUserData(updatedUser));

  //   userInfo;
  //   dispatch(userData(updatedUser));
  // };

  // 데이터 전송
  function handleEditUserInfo() {
    postUserInfo();
    setEdit(!edit);
  }

  function handleEdit() {
    setEdit(true);
  }

  // function getGender() {
  //   if (userInfo?.gender !== null) {
  //     if (userInfo.gender === "M") {
  //       return "M"
  //     } else if (userInfo.gender === "Y") {
  //       return "Y"
  //     }
  //   }

  //   return ""
  // }

  // const genderValue = getGender();

  // console.log({genderValue});
  // console.log({userInfo});

  // 생일을 위한 상태 변수, 초기값은 현재 날짜 또는 userInfo의 생일 날짜
  const [birthDate, setBirthDate] = useState(null);

  return (
    <S.Book2Container>
      {!edit ? (
        <>
          <S.EditButton onClick={handleEdit} />
        </>
      ) : (
        <></>
      )}

      <S.ProfileBox>
        <S.Images src={displayProfileImage()} alt="프로필사진" />
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
          value={userInfo && userInfo.nickname}
          id="nickname"
          name="nickname"
          // onChange={(e) => handleInfoChange(e, "nickname")}
          readOnly={!edit}
          edit={edit}
          maxLength={8}
        />
      </S.NickName>
      <S.Date>
        <S.Question>생일/Date of birth</S.Question>
        <S.DatePick>
          <DatePicker
            className="input"
            dateFormat="yyyy-MM-dd"
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            locale={ko}
            selectsStart
            startDate={birthDate}
            endDate={endDate}
            readOnly={!edit}
            edit={edit}
          />
        </S.DatePick>
        {/* <BsCalendarHeart /> */}
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
              // onChange={(e) => handleInfoChange(e, "gender")}
            />
            M
            <input
              type="radio"
              id="gender"
              value="Y"
              name="gender"
              // onChange={(e) => handleInfoChange(e, "gender")}
            />
            F
          </>
        ) : (
          <>
            {/* <S.Answer
              type="text"
              value={
                genderValue
              }
              readOnly
              edit={edit}
            /> */}
          </>
        )}
      </S.Sex>
      <S.DateOfIssue>
        <S.Question readOnly>발급일/Date of issue</S.Question>
        {userInfo && userInfo.dateOfIssue}
      </S.DateOfIssue>
      <S.NunberBarcord>
        <S.Question readOnly>보유 바코드 수/Number</S.Question>
        {userInfo && userInfo.barcodeCount}
      </S.NunberBarcord>
      <S.UserBarcord>
        <S.Images src={userBarcord} />
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
  );
}
