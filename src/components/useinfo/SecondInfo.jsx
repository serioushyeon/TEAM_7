import React, { useState, useEffect } from "react";
import axios from "axios";
import { S } from "./Style";
import { ko } from "date-fns/esm/locale";
import { BsCalendarHeart } from "react-icons/bs";
import userBarcord from "../../assets/images/userinfo/SubStartBar.png";
import defaultProfileImage from "../../assets/images/userinfo/SubStartPro.png";
import defaultImage from "../../assets/images/userinfo/defaultProfile.svg";
// import { userData } from "./userData";

export default function Second() {
  // const dispatch = useDispatch();
  // 생일을 위한 상태 변수, 초기값은 현재 날짜 또는 userInfo의 생일 날짜
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [edit, setEdit] = useState(false);

  // 입력받을 값들은 개별적으로 정의하였다.
  const [fileState, setFileState] = useState("");
  const [birth, setBirth] = useState(null);
  const [user, setUser] = useState({
    nickname: "",
    birth: "",
    gender: "",
    dateOfIssue: "",
    barcodeCount: 0,
    profileImage: "",
    recentBarcodeImg: "",
    recentBarcodeTitleList: ["", "", ""],
    modalActive: false,
  });

  // 쿠키 받아오기
  const getAccessCookie = localStorage.getItem("accessCookie");
  // const getRefreshCookie = localStorage.getItem("refreshCookie");

  // const defaultpro = "../../assets/images/userinfo/SubStartPro.png";

  /* const displayProfileImage = () => {
    return user && user.profileImage ? user.profileImage : defaultProfileImage;
  };
  */

  // get 메서드는 한 번만!
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

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // formData 전송, 편집 버튼 클릭 시
  const postUserInfo = async () => {
    const formData = new FormData();

    // 파일을 formdata로 전송
    formData.append("profileImage", fileState);

    formData.append("nickname", user.nickname);
    formData.append("birth", user.birth);
    formData.append("gender", user.gender);

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

  // 프로필 이미지 핸들러
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];

    // 미리보기 url
    const objectUrl = URL.createObjectURL(file);

    setUser((prevUser) => ({ ...prevUser, profileImage: objectUrl }));
    console.log("image url: ", objectUrl);
    // console.log(user.profileImage);
  };

  // 닉네임 핸들러
  const handleNickName = (e) => {
    setUser({
      ...user,
      nickname: e.target.value,
    });
  };

  // 성별 핸들러
  const handleGender = (e) => {
    setUser({ ...user, gender: e.target.value });
  };

  // 날짜를 YYYY-MM-DD 형식의 문자열로 변환하는 함수
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2); // 월은 0부터 시작하므로 1을 더합니다.
    const day = `0${d.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  // 생일 핸들러
  const handleBirthDay = (date) => {
    setBirth(date);
    const formattedDate = formatDate(date);
    setUser({ ...user, birth: formattedDate });
  };

  // 데이터 전송
  function handleEditUserInfo() {
    postUserInfo();
    setEdit(!edit);
  }

  function handleEdit() {
    setEdit(true);
  }

  return (
    <S.Book2Container>
      {!edit ? (
        <>
          <S.EditButton onClick={handleEdit} />
        </>
      ) : (
        <></>
      )}
      {edit ? (
        <>
          <S.ProfileBox>
            {user.profileImage ? (
              <S.Images src={user.profileImage} alt="프로필사진" />
            ) : (
              <S.Images src={defaultImage} />
            )}
          </S.ProfileBox>
          <S.ProfileLabel htmlFor="profileImage">
            프로필 사진
            <br />
            변경
          </S.ProfileLabel>
          <S.InputProfile
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleProfileImageChange}
          />
        </>
      ) : (
        <S.ProfileBox>
          {user.profileImage ? (
            <S.Images src={user.profileImage} alt="프로필사진" />
          ) : (
            <S.Images src={defaultImage} />
          )}
        </S.ProfileBox>
      )}
      <S.NickName>
        <S.Question>닉네임/Nick name</S.Question>
        {edit ? (
          <S.Answer
            type="text"
            value={user && user.nickname}
            id="nickname"
            name="nickname"
            // onChange={(e) => handleInfoChange(e, "nickname")}
            readOnly={!edit}
            edit={edit}
            maxLength={8}
            onChange={handleNickName}
          />
        ) : (
          <S.AnswerSpan>
            {user.nickname || "닉네임을 입력해주세요."}
          </S.AnswerSpan>
        )}
      </S.NickName>
      <S.Date>
        <S.Question>생일/Date of birth</S.Question>
        {edit ? (
          <>
            <>
              <S.SDatePicker
                className="input"
                selected={birth}
                dateFormat="yyyy-MM-dd"
                onChange={handleBirthDay}
                locale={ko}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </>
            <S.SBsCalendarHeart>
              <BsCalendarHeart />
            </S.SBsCalendarHeart>
          </>
        ) : (
          <S.AnswerSpan>{user.birth}</S.AnswerSpan>
        )}
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
              onChange={handleGender}
              checked={user.gender === "M"}
            />
            M
            <input
              type="radio"
              value="F"
              id="gender"
              name="gender"
              onChange={handleGender}
              checked={user.gender === "F"}
            />
            F
          </>
        ) : (
          <>
            {
              <S.AnswerSpan>
                {user.gender || "성별을 선택해주세요."}
              </S.AnswerSpan>
            }
          </>
        )}
      </S.Sex>
      <S.DateOfIssue>
        <S.Question readOnly>발급일/Date of issue</S.Question>
        {user && user.dateOfIssue}
      </S.DateOfIssue>
      <S.NunberBarcord>
        <S.Question readOnly>보유 바코드 수/Number</S.Question>
        {user && user.barcodeCount}
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
