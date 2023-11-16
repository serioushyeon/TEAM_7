import "./EventSetting.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsCalendarHeart, BsCalendarWeek } from "react-icons/bs";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "../../components/EventToast/EventToast";

const EventSetting = () => {
  const event = useSelector((state)=>state.eventList);
  const myEvent = useSelector((state)=>state.myEvent);
  const title = event.eventName;
  const startD = event.startDate
  const endD = event.endDate;

  const [startDate, setStartDate] = useState(new Date(startD));
  const [endDate, setEndDate] = useState(new Date(endD));
  const [eventName, setEventName] = useState(title);
  const [toast, setToast] = useState(false);
  
  const saveEventName = (e) => {
    setEventName(e.target.value);
  };

  const showToast = () => {
    alert("날짜를 다시 지정해주세요");
  }
  const navigate = useNavigate();
  const makeEvent = () => {
    postEventData();

  }
  const goToEventDisplay = () => {
    navigate(`/eventdisplay/${myEvent.eventId}`, { state: { startDate, endDate, eventName } });
  };

  const editEvent = () => {
    putEventName();
    putEventNDate();
    goToEventDisplay();
  }
  const postEventData = async () => {
    try {
      const response = await axios.post(`/api/v1/event/new-event`, {
        title: eventName,
        startDate : startDate,
        endDate: endDate,
      });
      console.log(response.data);
      goToEventDisplay();
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  const putEventName = async () => {
    try {
      const response = await axios.put(`/api/v1/event/${event.id}/event-name`, {
        eventName: eventName
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data", error);
    }
  }
  const putEventNDate = async () => {
    try {
      const response = await axios.put(`/api/v1/event/${id}/event-name`, {
        startDate : startDate,
        endDate: endDate,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data", error);
    }
  }
  return (
    <>
      <div className="eventSetting">
        <div className="eventTitle">함께 할 이벤트 생성하기</div>
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
          !myEvent.isExistEvent ? 
          <button className="eventMakeBtn" onClick={(startDate > endDate) ? showToast : goToEventDisplay}>
            이벤트 생성
          </button> :
          <button className="eventMakeBtn" onClick={(startDate > endDate) ? showToast : goToEventDisplay}>
            이벤트 수정
          </button>
          }
        </div>
      </div>
    </>
  );
};
export default EventSetting;
