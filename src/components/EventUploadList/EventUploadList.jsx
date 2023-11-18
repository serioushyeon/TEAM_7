//본인이 올린 것이어야 삭제 가능
//->현재 접속 닉네임과 리스트의 닉네임이 일치해야 삭제 버튼 활성화
//닉네임을 몇자까지 표시할 것인지
//완료버튼 추가하기
import "./EventUploadList.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaTrashAltSolid } from "react-icons/lia";
import { useState, useEffect } from "react";
import EventModel from "../EventModal/EventModal";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setMyEvent } from "../../redux/myEventSlice";
import axios from "axios";
import { apiClient } from '../../api/ApiClient';
const EventUploadBlock = ({eventBlock}) => {
  const navigate = useNavigate();
  const navigateToEventPhoto = () => {
    navigate(`/eventphoto/${eventBlock.id}`);
  };
  return (
    <div className="list">
      <div className="uploadlist" onClick={navigateToEventPhoto}>
        <div className="done">
        </div>
        <div className="nicknameBox">
          {eventBlock.title}
        </div>
        <div className="count">+{eventBlock.imageCount}</div>
      </div>  
    </div>
  );
};

const NoList = () => {
  return (
    <div className="list">
      <div className="uploadlist">
        <div className="noList">아직 생성된 리스트가 없습니다.</div>
      </div>
    </div>
  );
};

// EventDisplay로부터 props를 받아옵니다.
const EventUploadList = ({ eventList }) => {
  const navigate = useNavigate();
  const goToEventSetting= () => {
    navigate("/eventsetting");
  }
  return (
    <div className="eventUploadList">
      {eventList.map((eventBlock) => (
        <EventUploadBlock eventBlock={eventBlock}/>
      ))}
      {eventList.length === 0 && <NoList />}
      <div className="addList" onClick={goToEventSetting}>
        <button className="addListBtn">
          <IoIosAddCircleOutline size="40" color="#F28B50" />
        </button>
      </div>
    </div>
  );
};

export default EventUploadList;
