//확인 모달 추가
//방폭파 기능
//수정 기능 (세팅 모달)
import { FiLink } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import './EventHeader.css';
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import EventModal from '../EventModal/EventModal';
import Toast from '../EventToast/EventToast';
import { TbDoorExit } from "react-icons/tb";
import { useSelector } from 'react-redux';
import {setMyEvent} from "../../redux/myEventSlice";
import { apiClient } from '../../api/ApiClient';
import axios from "axios";

const EventHeader = () => {
    const eventId = useSelector((state) => state.myEvent.value.eventId);
    const users = useSelector((state) => state.eventList.value);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [toast, setToast] = useState(false);
    const getAccessCookie = localStorage.getItem("accessCookie");
    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };

      const copyUrl = async () => {
        var textarea = document.createElement('textarea');
        textarea.value = location.href;

        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 9999);  // 추가

        document.execCommand('copy');
        document.body.removeChild(textarea);

        setToast(true);
    };
      const navigate = useNavigate();

      const goToEvent = () => {
          navigate("/event")
      }
      const goToSetting = () => {
        navigate(`/eventsetting/edit`);
      }

      //방나가기
      const exitEventData = async () => {
        try {
          const response = await axios.delete(`/api/v1/event/${eventId}}`, {
            headers: {
              Authorization: `Bearer ${getAccessCookie}`
          }
        });
        const mEvent  = { existEvent: false, eventId: "" };
        dispatch(setMyEvent(mEvent));
        closeModal();
        goToEvent();
        } catch (error) {
            console.error(error);
        }
      };
    return (
        <>
        <div>
        {toast && <Toast setToast={setToast} text={"클립보드에 복사되었습니다."}/>}
        <div className="header">
            <div className = "left">
                <div className='name'>{users.eventName}</div>
                <div className='date'>{users.startDate}~{users.endDate}</div>
            </div>
            <div className='right'>
                <button className='invite' onClick={copyUrl}> 
                    <FiLink size="22" color="white"/>
                </button>
                <button className='exit' onClick={openModal}> 
                    <TbDoorExit size="22" color="white"/>
                </button>
                {users.roomMaker ? 
                <button className='edit' onClick={goToSetting}>
                    <FaRegEdit size="22" color="white"/>
                </button> : <></>}
            </div>
            <EventModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                mainContent={"이벤트를"}
                highlight={users.roomMaker? "폭파":"퇴장"}
                end={users.roomMaker? "하시겠습니까?":"하시겠습니까?"}
                notice={users.roomMaker? "※참여한 모든 인원이 자동으로 나가집니다." : "※지금까지 참여한 이벤트가 삭제됩니다."}
                action={exitEventData}
            />
        </div>
        </div>
        </>
    );
};
export default EventHeader;