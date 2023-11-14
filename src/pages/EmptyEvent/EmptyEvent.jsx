import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './EmptyEvent.css';
import { BsCalendar4Event } from "react-icons/bs"
const EmptyEvent = () => {
    //참여하고 있는 이벤트가 있는 지 체크
    //참여하고 있다면
    //이벤트 아이디로 링크 이동
    //참여하지 않고 있다면
    const navigate = useNavigate();
    const goToEventSet = () => {
        navigate("/eventsetting");
    }
    return (
        <>
            <div className="eventsetting">
                <div className="eventIconDiv">
                    <BsCalendar4Event size="24"/>
                </div>
                <div className="noEvent">
                    참여중인 이벤트가 없습니다.
                </div>
                <div className="eventComment">
                    새로운 <span>이벤트</span>를 만들어 보세요!
                </div>
                <div className="newEventBox">
                    <div className="newEvent" onClick={goToEventSet}>
                        새로운 이벤트 만들기
                    </div>
                </div>
            </div>
        </>
    );
};
export default EmptyEvent;
  