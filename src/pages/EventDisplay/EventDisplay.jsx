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
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import BG from "../../assets/images/Event/eventBG.jpg";

const EventDisplay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.eventList);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  let stompClient = null;

  //무코 생성 버튼 활성화
  const connectWebSocket = () => {
    const socket = new SockJS("/ws-button");
    stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      function (frame) {
        console.log("Connected: " + frame);
        stompClient.subscribe(`/subscribe/button/${id}`, function (message) {
          const messageBody = JSON.parse(message.body);
          setButtonEnabled(messageBody.buttonStatus);
        });
      },
      function (error) {
        console.error("WebSocket error:", error);
      }
    );
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, [id]); // id가 변경될 때마다 연결을 재설정합니다.

  // 방 폭파 알림을 위한 WebSocket 연결
  const connectWebSocketForLeaveEvent = () => {
    const socket = new SockJS("/ws-leave-event");
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      function (frame) {
        console.log("Connected: " + frame);
        stompClient.subscribe(
          `/subscribe/leave-event/${id}`,
          function (message) {
            const messageBody = JSON.parse(message.body);
            if (messageBody.eventStatus === true) {
              alert("이벤트가 폭파되었습니다!");
              // 여기에 추가적인 처리 로직을 구현할 수 있습니다.
            }
          }
        );
      },
      function (error) {
        console.error("WebSocket error:", error);
      }
    );

    return stompClient;
  };

  useEffect(() => {
    const stompClient = connectWebSocketForLeaveEvent();

    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, [id]);

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

  return (
    <>
      <div
        className="eventDisplayWrap"
        style={{ backgroundImage: `url(${BG})` }}
      >
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
