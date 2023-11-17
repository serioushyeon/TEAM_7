import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { S } from './Style'
import { apiClient } from '../../api/ApiClient';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from "react-cookie";
import { userData } from '../../redux/userInfoSlice';

import InfoBarcord from "../../assets/images/userinfo/infoBarcord.svg";
import Cloud from "../../assets/images/userinfo/cloud.svg";
import Profile from "../../assets/images/userinfo/profile.svg";

/*
{
	"nickname":"String",     // KangSeungJun
	"birth":"String",        // 1999.09.01
	"gender":"String",       // M or Y
	"dateOfIssue" : "String",// 1999.09.01
	"barcodeCount" : "int",   //4
	"profileImage" : "String"   //https://www.ahdsfadsfafd~~~~ (url로 넘어갑니다!)
  "recentBarcodeImg" : "String", // https://www.ahdsfadsfafd~~~~ (url로 넘어갑니다!)
	"recentBarcodeTitleList" : "List<String>", // String의 List로 넘어갑니다. 없으면 null
	"modalActive" : "boolean"
//이값이 true 면 처음 회원가입하는 유저 -> 정보를 수정하라는 모달?? 알람?? 을 띄워야함
//이값이 false면 이미 정보수정을 한 유저로 모달?? 알람?? 을 띄울필요가 없음!! 
}
*/

export default function SecondInfo() {
  const dispatch = useDispatch();
  var formData = new FormData();

  const [accessCookie] = useCookies(["accessCookie"]);
  const [refreshCookie] = useCookies(["refreshCookie"]);

  const getAccessCookie = localStorage.getItem("accessCookie");
   const getRefreshCookie = localStorage.getItem("refreshCookie");

  // 리덕스(userData 대신 사용)
  const userInfo = useSelector(state => state.userdata); 
  console.log('userInfo: ', userInfo);

  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [user, setUser] = useState({
    nickName: "",
    birth: "",
    gender: "",
    dateOfIssue: "",
    barcodeCount: 0,
    profileImage: "",
    recentBarcodeImg: "",
    recentBarcodeTitleList: ["", "", ""],
    modalActive: false,
  })

  // 유저 정보 get 메서드
  const getUserInfo = async () => {
    try {
      const response = await axios.get(`/api/v1/user/user-info`, {
        headers: {
          // 쿠키 보냄
          Authorization: `Bearer ${getAccessCookie}`
        },
      });
      console.log("성공, UserInfo : ", response.data);
      dispatch(userInfoSlice(response.data));
      setUser(response.data);
      // 데이터 재세팅

      if(response.data.modalActive === false) {
        alert("정보를 입력해주세요 !");
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { 
    getUserInfo();
    // 쿠키가 없다면
    if (user.modalActive === false) {
    } else {
      setConfirm(true);
    }
  }, []); 

  // formData가 변경될 때마다 getUserInfo 함수 실행
  useEffect(() => {
    if(!isUserInfoComplete()) {
      setEdit(true);
    }
    
    getUserInfo();
  }, [formData]); 

   // 유저 정보 완전성 확인
   const isUserInfoComplete = () => {
    return user.nickName && user.birth && user.gender;
  };


  // 유저 데이터 실시간 수정
  const handleInfoChange = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };
  

// formData 전송, 편집 버튼 클릭 시
const handleEditUserInfo = async (event) => {
  if(edit === false) {
    setEdit(!edit); // 편집 모드 토글
  // 편집 후 다시 버튼 클릭 시
  }
  else {
    if(isUserInfoComplete()) {
      setConfirm(true);
      
    event.preventDefault();
// 폼 데이터로 전송
    formData.append('profileImage', user.profileImage);
    formData.append('nickName', user.nickName);
    formData.append('birth', user.birth);
    formData.append('gender', user.gender);
    dispatch(userData(user));

    try {
      const response = await axios.post(`/api/v1/user/user-info`, formData, {
        headers: {
          // 쿠키 보냄, axios가 자동으로 Content-type 설정해줌.
          // 'Content-Type': 'multipart/form-data' <= 미설정 시 이 코드 추가
          Authorization: `Bearer ${getAccessCookie}`
        },
      });
      console.log("성공 formData : ", response.data);
    } catch (error) {
      console.error("실패 error : ", error);
    }

    setEdit(!edit);
  } else {
    alert("닉네임, 성별, 생일을 입력해주세요. ");
  }
}
};

// 프로필 이미지 변경 핸들러
// file의 경우 value 이용이 불가하기 때문에 미리보기로 대체해야함.
const handleProfileImageChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUser({ ...user, profileImage: imageUrl }); 
    // 미리보기 URL을 user 상태에 저장
  }
};

  return (
    <S.Book2Container>
            <S.EditButton
            confirm={!confirm}
            onClick={handleEditUserInfo}/>
            <S.ProfileBox>
              {!user.profileImage ? (
                <>
                </>
              ) :
              (
                <S.Images src = {user.profileImage} />
              )}
            </S.ProfileBox>
            {edit ? 
            (<>
             <S.ProfileLabel htmlFor="profile">프로필 사진<br />변경</S.ProfileLabel>
            </>) : (<>
            
            </>)}
            <S.InputProfile 
            type="file" 
            id="profile"
            onChange={handleProfileImageChange}
            disabled={!edit}
            />
            <S.NickName>
            <S.Question>닉네임/Nick name</S.Question>
            <S.Answer 
            type="text" 
            value={user.nickName}
            onChange={(e) => handleInfoChange(e, 'nickName')} 
            readOnly={!edit}
            edit = {edit}
            maxLength={8} 
            placeholder="이름을 입력해주세요."/>
            </S.NickName>
            <S.Date>
              <S.Question>생일/Date of birth</S.Question>  
            <S.Answer 
            type="date" 
            name="birthday"
            min="1900-01-01"
            max="2024-01-01"
            value={user.birth}
            placeholder='0000-00-00'
            onChange={(e) => handleInfoChange(e, 'birth')} 
            readOnly={!edit}
            edit = {edit} />
            </S.Date>
            <S.Sex>
            <S.Question>성별</S.Question>
              {edit ? (
                <>
                <input
                type="radio" 
                value="M"
                name="gender"
                onChange={(e) => handleInfoChange(e, 'gender')} 
                />M
                <input
            type="radio" 
            value="Y"
            name="gender"
            onChange={(e) => handleInfoChange(e, 'gender')} 
            />Y
                </>
              ) : (
            <>
             <S.Answer 
             type="text" 
             value={user.gender === 'M' ? '남성' : (user.gender === 'Y' ? '여성' : '')}
             readOnly
             edit = {edit}
           />
           </>
              )}
            
            </S.Sex>
            <S.DateOfIssue>
            <S.Question
            readOnly
            >발급일/Date of issue</S.Question>
            {userInfo.dateOfIssue}
            </S.DateOfIssue>
            <S.NunberBarcord>
            <S.Question
            readOnly
            >보유 바코드 수/Number</S.Question>
            {userInfo.barcodeCount}
            </S.NunberBarcord>
            <S.UserBarcord>
            {!userInfo.recentBarcodeImg ? (
                <>
                </>
              ) :
              (
                <S.Images src = {userInfo.recentBarcodeImg} />
              )}
            </S.UserBarcord>
          </S.Book2Container>
  )
              }