import React, { useState, useEffect } from "react";
import EventHeader from "../../components/EventHeader/EventHeader";
import EventParticipants from "../../components/EventParticipants/EventParticipants";
import EventUploadList from "../../components/EventUploadList/EventUploadList";
import "./EventDisplay.css";
import BarcodeLoading from "../../components/BarcodeLoading/BarcodeLoading";
import { useDispatch, useSelector } from "react-redux";
import { setEventList } from "../../redux/eventListSlice";
import { setMyEvent } from "../../redux/myEventSlice";
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import BG from "../../assets/images/Event/eventBG.jpg";

const EventDisplay = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.eventList.value);
  const eventId = useSelector((state) => state.myEvent.value.eventId);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  let stompClient = null;
  const getAccessCookie = localStorage.getItem("accessCookie");

  useEffect(() => {
    console.log("Event ID:", eventId);
  }, [eventId]);

  // 소켓을 통해 무코 생성 버튼 활성화 여부를 설정하는 코드
  useEffect(() => {
    const socket = new SockJS("/ws-button");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe(`/subscribe/button/${eventId}`, (message) => {
        const messageBody = JSON.parse(message.body);
        setButtonEnabled(messageBody.buttonStatus === "true");
      });
    });

    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, [eventId]);

  // 방 폭파 알림을 위한 WebSocket 연결
  useEffect(() => {
    const socket = new SockJS("/ws-leave-event");
    stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      function (frame) {
        console.log("Connected: " + frame);
        stompClient.subscribe(
          `/subscribe/leave-event/${eventId}`,
          function (message) {
            const messageBody = JSON.parse(message.body);
            if (messageBody.eventStatus === true) {
              alert("이벤트가 폭파되었습니다!");
            }
          }
        );
      },
      function (error) {
        console.error("WebSocket error:", error);
      }
    );

    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, [eventId]);

  //여기부터!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //그 여기 페이지 보고 싶으면 여기부터 저기 뒤에 "//여기까지!!" 까지 주석처리하면 됩니다. 지금 get해올게 없어서 로딩중 떠요 ㅠ
  // 이벤트 데이터 가져오기

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`/api/v1/event/${eventId}`, {
          headers: {
            Authorization: `Bearer ${getAccessCookie}`,
          },
        });
        console.log(response.data);
        dispatch(setEventList(response.data));
      } catch (error) {
        console.error(error);
        /*if(error.response.statusText === "EVENT_NOT_FOUND")
        {

        }
        if(error.response.statusText === "USER_NOT_FOUND")
        {
          alert("다시 로그인해주세요");
          //로그아웃
          navigate(`/`);
        }
        console.error("Error fetching event data:", error);
      }*/
      }
    };

    fetchEventData();
  }, []);

  //여기까지!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 바코드 생성 핸들러
  const handleBarcodeGeneration = async () => {
    if (buttonEnabled) {
      try {
        const response = await axios.post(`/api/v1/event/${eventId}/result`, {
          headers: {
            Authorization: `Bearer ${getAccessCookie}`,
          },
        });
        console.log("Barcode generated successfully:", response.data);
      } catch (error) {
        console.error("Error in generating barcode:", error);
        if (error.response.statusText === "NOT_ROOM_MAKER") {
        }
        if (error.response.statusText === "EVENT_PHOTO_EXCEED") {
        }
        if (error.response.statusText === "EVENT_PHOTO_IS_LESS_THAN") {
        }
        if (error.response.statusText === "EVENT_NOT_FOUND") {
        }
        if (error.response.statusText === "USER_NOT_FOUND") {
          alert("다시 로그인해주세요");
          //로그아웃
          navigate(`/`);
        }
      }
    } else {
      console.log("Barcode generation button is disabled.");
    }
  };

  return (
    <div className="eventDisplayWrap" style={{ backgroundImage: `url(${BG})` }}>
      <EventHeader />
      <EventParticipants />
      <EventUploadList
        userInfo={users.userInfo}
        loginUserId={users.loginUserId}
      />
      {users.roomMaker && (
        <div className="makeBarcode">
          <button
            className={`makeBarcodeBtn ${buttonEnabled ? "active" : ""}`} // 조건부 클래스 추가
            onClick={handleBarcodeGeneration}
            disabled={!buttonEnabled}
          >
            무코 생성
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDisplay;
