import "./EventSetting.css";
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { BsCalendarHeart, BsCalendarWeek } from "react-icons/bs";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { apiClient } from '../../api/ApiClient';
const EventSetting = () => {
  const getAccessCookie = localStorage.getItem("accessCookie");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventName, setEventTitle] = useState();
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
  const goToEvent = () => {
    navigate(`/event`);
  };

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
    goToEvent();
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  return (
    <>
      <div className="eventSetting">
        <div className="eventTitle">
        함께 할 이벤트 생성하기</div>
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
        <div className="eventMake">
          <button className="eventMakeBtn" onClick={() => {eventAlert(); flag ? postEventData() : ()=>{}}}>
            이벤트 생성
          </button>
        </div>
      </div>
    </>
  );
};
export default EventSetting;
