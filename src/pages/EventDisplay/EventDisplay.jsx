import React, { useState, useEffect, useLayoutEffect } from "react";
import EventHeader from "../../components/EventHeader/EventHeader";
import EventUploadList from "../../components/EventUploadList/EventUploadList";
import "./EventDisplay.css";
import BG from "../../assets/images/Event/eventBG.jpg";
import { apiClient } from '../../api/ApiClient';

const EventDisplay = () => {
  const [eventList, setEventList] = useState();
  const getAccessCookie = localStorage.getItem("accessCookie");
  //이벤트 목록 받아옴
  useLayoutEffect(() => {
    console.log("실행");
    const fetchEventData = async () => {
      try {
        console.log("실행");
        const response = await apiClient.get(`/api/v1/event/event-list`, {
          headers: {
            Authorization: `Bearer ${getAccessCookie}`,
          },
        });
        console.log(response.data);
        setEventList(response.data.eventList);
      } catch (error) {
        console.error(error);
        }
      };
  
      fetchEventData();
    }, []);
  if(!eventList){
    return null;
  }
  return (
    <div className="eventDisplayWrap" style={{ backgroundImage: `url(${BG})` }}>
      <EventHeader/>
      <EventUploadList
        eventList={eventList}
      />
    </div>
  );
};

export default EventDisplay;
