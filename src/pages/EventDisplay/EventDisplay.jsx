import React, { useState, useEffect, useLayoutEffect } from "react";
import EventHeader from "../../components/EventHeader/EventHeader";
import EventUploadList from "../../components/EventUploadList/EventUploadList";
import "./EventDisplay.css";
import BG from "../../assets/images/Event/eventBG.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from '../../api/ApiClient';

const EventDisplay = () => {
  const [eventList, setEventList] = useState(null);
  const getAccessCookie = localStorage.getItem("accessCookie");
  //이벤트 목록 받아옴
  useLayoutEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await apiClient.get(`/api/v1/event/event-list`, {
          headers: {
            Authorization: `Bearer ${getAccessCookie}`,
          },
        });
        setEventList(response.data);
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
  const navigate = useNavigate();
  return (
    <div className="eventDisplayWrap" style={{ backgroundImage: `url(${BG})` }}>
      <EventHeader/>
      <EventUploadList
        eventList={eventList.eventList}
      />
    </div>
  );
};

export default EventDisplay;
