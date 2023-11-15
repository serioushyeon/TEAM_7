import React, { useState } from 'react'
import axios from 'axios';
import { S } from './Style'
import { apiClient } from '../../api/ApiClient';
import DafaultProfile from '../../assets/images/userinfo/defaultProfile.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

const DUMMY_USERINFO = {
  nickName: "Eunji",
    birth: "2002.08.27",
    gender: "Y",
    dateOfIssue: "2023.11.15",
    barcodeCount: 4,
    profileImage: "",
    recentBarcodeImg: "",
    recentBarcodeTitleList: [],
    modalActive: false,
}

export default function SecondInfo() {
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    nickName: "Eunji",
    birth: "2002.08.27",
    gender: "Y",
    dateOfIssue: "2023.11.15",
    barcodeCount: 4,
    profileImage: "",
    recentBarcodeImg: "",
    recentBarcodeTitleList: [],
    modalActive: false,
  })
  

  // 리덕스
  const userInfo = useSelector((state) => state.userData);

  // 유저 정보 받아오기
  const getUserInfo = async () => {
    try {
      const response = await apiClient.get(`/api/v1/user/user-info`, {
        headers: {
          // 나중에 토큰 수정 필요
          Authorization: `${Bearer [access_token]}`
        },
      });
      console.log("성공, UserInfo : ", response.data);

    } catch (error) {
      console.log(error);
    }
  }

  setUserData
  // 유저 정보 수정 시 전송
  const setUserInfo = async () => {

  }

  const handleInfoChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };
  

const handleEditUserInfo = () => {
  setEdit(!edit); // 편집 모드 토글
};

  return (
    <S.Book2Container>
            <S.EditButton onClick={handleEditUserInfo}/>
            <S.ProfileImage url = {userData.profileImage}/>
            <S.InputProfile type="file" />
            <S.NickName>
            <S.Question>닉네임/Nick name</S.Question>
            <S.Answer 
            type="text" 
            value={userData.nickName}
            onChange={(e) => handleInfoChange(e, 'nickName')} 
            readOnly={!edit}
            editable={edit} />
            </S.NickName>
            <S.Date>
              <S.Question>생일/Date of birth</S.Question>  
            <S.Answer 
            type="text" 
            value={userData.birth}
            onChange={(e) => handleInfoChange(e, 'birth')} 
            readOnly={!edit} />
            </S.Date>
            <S.Sex>
            <S.Question>성별</S.Question>
            <S.Answer 
            type="text" 
            value={userData.gender}
            onChange={(e) => handleInfoChange(e, 'gender')} 
            readOnly={!edit} />
            </S.Sex>
            <S.DateOfIssue>
            <S.Question>발급일/Date of issue</S.Question>
            {userData.dateOfIssue}
            </S.DateOfIssue>
            <S.NunberBarcord>
            <S.Question>보유 바코드 수/Number</S.Question>
            {userData.barcodeCount}
            </S.NunberBarcord>
            <S.UserBarcord />
          </S.Book2Container>
  )
}
