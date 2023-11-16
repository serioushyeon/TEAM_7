import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventHeader from "../../components/EventHeader/EventHeader";
import EventParticipants from "../../components/EventParticipants/EventParticipants";
import EventUploadList from "../../components/EventUploadList/EventUploadList";
import "./EventDisplay.css";
import BarcodeLoading from "../../components/BarcodeLoading/BarcodeLoading";
import { useDispatch, useSelector } from "react-redux";
import { setEventList } from "../../redux/eventListSlice";
import axios from "axios";
import { io } from "socket.io-client";

const EventDisplay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.eventList);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  // 방장이 나가기 알림을 위한 소켓 설정
  const leaveEventSocket = io("/ws-leave-event");

  // API 요청 및 소켓 설정
  const fetchEventListData = async () => {
    try {
      const response = await axios.get(`/api/v1/event/${id}`, {
        headers: { Authorization: `Bearer [access_token]` },
      });
      const {
        profileImgUrlList,
        isRoomMaker,
        eventName,
        startDate,
        endDate,
        loginUserId,
        userCount,
        userInfo,
      } = response.data;
      dispatch(
        setEventList({
          profileImgUrlList,
          isRoomMaker,
          eventName,
          startDate,
          endDate,
          loginUserId,
          userCount,
          userInfo,
        })
      );
      setupSockets();
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // 소켓 설정 함수
  const setupSockets = () => {
    const checkSocket = io("/ws-check");
    const buttonSocket = io("/ws-button");
    const leaveEventSocket = io("/ws-leave-event");

    // 버튼 소켓 이벤트 리스너 설정
    buttonSocket.on(`/subscribe/button/${id}`, (data) => {
      if (data.eventId === id) {
        setButtonEnabled(data.buttonStatus);
      }
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      checkSocket.disconnect();
      buttonSocket.disconnect();
      leaveEventSocket.disconnect();
    };
  };

  useEffect(() => {
    fetchEventListData();
  }, [id, dispatch]);

  // 바코드 생성 핸들러
  const handleBarcodeGeneration = async () => {
    if (buttonEnabled) {
      try {
        const response = await axios.post(`/api/v1/event/${id}/result`);
        console.log("Barcode generated successfully:", response.data);
      } catch (error) {
        console.error("Error in generating barcode:", error);
      }
    } else {
      console.log("Barcode generation button is disabled.");
    }
  };

  // 소켓 이벤트 리스너 추가
  useEffect(() => {
    // 방장이 나갈 때 알림을 받음
    leaveEventSocket.on(`/subscribe/leave-event/${id}`, (data) => {
      if (data.eventStatus && data.eventId === id) {
        // 방이 폭파되었다는 알림을 여기서 처리
        alert("방이 폭파되었습니다.");
      }
    });

    return () => {
      // 컴포넌트 언마운트 시 소켓 연결 해제
      leaveEventSocket.disconnect();
    };
  }, [id]);

  return (
    <>
      <div className="eventDisplayWrap">
        <EventHeader />
        <EventParticipants />
        <EventUploadList
          userInfo={users.userInfo}
          loginUserId={users.loginUserId}
        />
        {users.isRoomMaker && (
          <div className="makeBarcode">
            <button
              className="makeBarcodeBtn"
              onClick={handleBarcodeGeneration}
              disabled={!buttonEnabled}
            >
              무코 생성
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EventDisplay;
