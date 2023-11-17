import "./EventSetting.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsCalendarHeart, BsCalendarWeek } from "react-icons/bs";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEventStartDate,setEventEndDate, setEventName } from "../../redux/eventListSlice";
import { apiClient } from '../../api/ApiClient';
import { setMyEvent } from "../../redux/myEventSlice";
const EventSetting = () => {
  const event = useSelector((state)=>state.eventList.value);
  const myEvent = useSelector((state)=>state.myEvent.value);
  const dispatch = useDispatch();
  const getAccessCookie = localStorage.getItem("accessCookie");
  const title = event.eventName;
  const startD = event.startDate
  const endD = event.endDate;
  const [startDate, setStartDate] = useState(new Date(startD));
  const [endDate, setEndDate] = useState(new Date(endD));
  const [eventName, setEventTitle] = useState(title);
  const [flag, setFlag] = useState(true);
  const saveEventName = (e) => {
    setEventTitle(e.target.value);
  };

  const eventAlert = () => {
    if( startDate > endDate ) {
      setFlag(false);
      alert("날짜를 다시 지정해주세요");
    }
    else {
      setFlag(true);
    }
    if(!eventName){
      setFlag(false);
      alert("이벤트 명을 작성해주세요");
    }
    else {
      setFlag(true);
    }
  }

  const navigate = useNavigate();
  const goToEventDisplay = () => {
    navigate(`/eventdisplay/${myEvent.eventId}`);
  };

  const editEvent = () => {
    putEventName();
    putEventDate();
    goToEventDisplay();
  }

  //이벤트 생성 API
  const postEventData = async () => {
    try {
      const response = await apiClient.post(`/api/v1/event/new-event`, {
        title: eventName,
        startDate : startDate,
        endDate: endDate,
      }, {
        headers: {
          Authorization: `Bearer ${getAccessCookie}`
      }
    });
    console.log(response.data);
    console.log(response.data.eventId);
    navigate(`/eventdisplay/${response.data.eventId}`)
    const data = { eventId: response.data.eventId, existEvent: true}
    dispatch(setMyEvent(data))
    dispatch()
    } catch (error) {
      console.error("Error posting data", error);
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.statusText);
      /*if(error.statusText === "USER_ALREADY_HAS_EVENT")
      {

      }
      if(error.statusText === "EVENT_TITLE_EMPTY")
      {
        
      }
      if(error.statusText === "USER_NOT_FOUNR")
      {
        alert("다시 로그인해주세요");
        //로그아웃
        navigate(`/`);
      }*/
    }
  };

  //이벤트 이름 수정 API
  const putEventName = async () => {
    console.log(myEvent);
    try {
      const response = await axios.put(`/api/v1/event/${myEvent.eventId}/event-name`, {
        eventName: eventName
      }, {
        headers: {
          Authorization: `Bearer ${getAccessCookie}`
      }
    });
      console.log(response.data);
      dispatch(setEventName(eventName));
    } catch (error) {
      console.error("Error posting data", error);
      /*if(error.statusText === "NOT_ROOM_MAKER")
      {

      }
      if(error.statusText === "EVENT_TITLE_EMPTY")
      {
        
      }
      if(error.statusText === "EVENT_NOT_FOUND")
      {

      }
      if(error.statusText === "USER_NOT_FOUND")
      {
        alert("다시 로그인해주세요");
        //로그아웃
        navigate(`/`);
      }*/
    }
  }

  //이벤트 기간 수정 API
  const putEventDate = async () => {
    console.log(myEvent);
    try {
      const response = await axios.put(`/api/v1/event/${myEvent.eventId}/event-date`, {
        startDate : startDate,
        endDate: endDate,
      }, {
        headers: {
          Authorization: `Bearer ${getAccessCookie}`
      }
    });
      console.log(response.data);
      dispatch(setEventStartDate(`${format(startDate, "yyyy-MM-dd")}`));
      dispatch(setEventEndDate(`${format(startDate, "yyyy-MM-dd")}`));
    } catch (error) {
      console.error("Error posting data", error);
      /*if(error.statusText === "NOT_ROOM_MAKER")
      {

      }
      if(error.statusText === "EVENT_NOT_FOUND")
      {

      }
      if(error.statusText === "USER_NOT_FOUND")
      {
        alert("다시 로그인해주세요");
        //로그아웃
        navigate(`/`);
      }*/
    }
  }
  return (
    <>
      <div className="eventSetting">
        <div className="eventTitle">
          {location.pathname === "/eventsetting/edit"?
          "이벤트 수정"
        :"함께 할 이벤트 생성하기"}</div>
        <div className="formWrap">
          <form className="eventForm">
            <div className="wrapper">
              <div className="titleWrapper">
                <div className="title">Event</div>
              </div>
              <div className="inputWrap">
                <input
                  className="input"
                  type="text"
                  placeholder="이벤트 명을 입력해 주세요"
                  value={eventName}
                  onChange={saveEventName}
                ></input>
                <div className="eventIconWrapWrap">
                  <div className="eventIconWrap">
                    <BsCalendarHeart />
                  </div>
                </div>
              </div>
            </div>
            <div className="wrapper">
              <div className="titleWrapper">
                <div className="title">Start Date</div>
              </div>
              <div className="inputWrap">
                <DatePicker
                  className="input"
                  dateFormat="yyyy-MM-dd"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  locale={ko}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <div className="eventIconWrapWrap">
                  <div className="eventIconWrap">
                    <BsCalendarWeek />
                  </div>
                </div>
              </div>
            </div>
            <div className="wrapper">
              <div className="titleWrapper">
                <div className="title">End Date</div>
              </div>
              <div className="inputWrap">
                <DatePicker
                  className="input"
                  dateFormat="yyyy-MM-dd"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  locale={ko}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
                <div className="eventIconWrapWrap">
                  <div className="eventIconWrap">
                    <BsCalendarWeek />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="eventMake">{
          location.pathname === "/eventsetting/edit" ? 
          <button className="eventMakeBtn" onClick={() => {eventAlert(); flag ? editEvent() : ()=>{}}}>
            이벤트 수정
          </button>
          :
          <button className="eventMakeBtn" onClick={() => {eventAlert(); flag ? postEventData() : ()=>{}}}>
            이벤트 생성
          </button>
          }
        </div>
      </div>
    </>
  );
};
export default EventSetting;
