import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventHeader from "../../components/EventHeader/EventHeader";
import EventParticipants from "../../components/EventParticipants/EventParticipants";
import EventUploadList from "../../components/EventUploadList/EventUploadList";
import "./EventDisplay.css";
import BarcodeLoading from "../../components/BarcodeLoading/BarcodeLoading"
const EventDisplay = () => {
  //   const navigate = useNavigate();
  //   // 로그인 상태와 사용자 정보를 저장할 스테이트
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const [userInfo, setUserInfo] = useState(null);

  //   useEffect(() => {
  //     // 여기에 로그인 상태를 확인하는 로직을 구현
  //     // 예를 들어, 로컬 스토리지나 세션 스토리지에서 토큰을 확인
  //     const token = localStorage.getItem("kakaoToken");
  //     if (!token) {
  //       // 토큰이 없으면 로그인 페이지로 리디렉션
  //       navigate("/");
  //     } else {
  //       // 토큰이 있으면 사용자 정보를 불러와서 저장
  //       setIsLoggedIn(true);
  //       // 예: 카카오 API를 사용하여 사용자 정보 가져오기
  //       fetchKakaoUserInfo(token).then((userInfo) => {
  //         setUserInfo(userInfo);
  //       });
  //     }
  //   }, []);


  const {id} = useParams();

  const userList = {
    profileImgUrlList:["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"],
		isRoomMaker : true,
		eventName : "경복궁 나들이",   
		startDate : "2023-10-09",   //Date의 형식은 2023-10-09, 2023-09-07 이런형식!!
		endDate : "2023-10-09",     //Date의 형식은 2023-10-09, 2023-09-07 이런형식!!
		loginUserId : "123",
		userInfo:
		[
			{
				userId : "123",
				nickname : "방장",
				imageUrlList:["https://via.placeholder.com/150","https://via.placeholder.com/150",],
				checkStatus : true,
				imageCount : 2
			},
			{	
				userId : "String",
				nickname : "String",
				imageUrlList:["https://via.placeholder.com/150"],
				checkStatus : false,
				imageCount : 1

			},
			{
				userId : "String",
				nickname : "String",
				imageUrlList:["https://via.placeholder.com/150","https://via.placeholder.com/150"],
				checkStatus : false,
				imageCount : 2

			}
		]
  }

  return (
    <>
      <div className="eventDisplayWrap">
        <EventHeader 
        eventName = {userList.eventName}
        startDate = {userList.startDate}
        endDate={userList.endDate}
        isRoomMaker={userList.isRoomMaker}
        />
        <EventParticipants
        profileImgUrlList = {userList.profileImgUrlList}
        />
        <EventUploadList userInfo = {userList.userInfo} loginUserId = {userList.loginUserId}/>
        {userList.isRoomMaker ? (
          <div className="makeBarcode">
            <button className="makeBarcodeBtn">무코 생성</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default EventDisplay;
