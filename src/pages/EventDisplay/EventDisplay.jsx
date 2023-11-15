import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventHeader from "../../components/EventHeader/EventHeader";
import EventParticipants from "../../components/EventParticipants/EventParticipants";
import EventUploadList from "../../components/EventUploadList/EventUploadList";
import "./EventDisplay.css";
import BarcodeLoading from "../../components/BarcodeLoading/BarcodeLoading"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setEventList } from '../../redux/eventListSlice';
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
  const dispatch = useDispatch();


  const fetchEventListData = async () => {
    try {
      const response = await axios.get(`/api/v1/event/${id}`);
      const {profileImgUrlList, isRoomMaker, eventName, startDate, endDate, loginUserId, userCount, userInfo} = response.data;
      dispatch(setEventList({profileImgUrlList, isRoomMaker, eventName, startDate, endDate, loginUserId, userCount, userInfo}));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };//useEffect

  const users = useSelector((state) => state.eventList.value);

  return (
    <>
      <div className="eventDisplayWrap">
        <EventHeader/>
        <EventParticipants/>
        {console.log(users.userCount)}
        <EventUploadList userInfo = {users.userInfo} loginUserId = {users.loginUserId}/>
        {users.isRoomMaker ? (
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
