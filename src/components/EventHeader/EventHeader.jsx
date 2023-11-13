//확인 모달 추가
//방폭파 기능
//수정 기능 (세팅 모달)
import { FiLink } from "react-icons/fi"
import { FaRegEdit } from "react-icons/fa"
import { AiOutlineSetting } from "react-icons/ai"
import './EventHeader.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import EventModal from '../EventModal/EventModal'
import Toast from '../EventToast/EventToast'
import { position } from "stylis";
const EventHeader = ({eventName, startDate, endDate, isRoomMaker}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [toast, setToast] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };

      const copyUrl = async () => {
        //await navigator.clipboard.writeText(url); // 링크 복사 부분
        setToast(true);
      };

      const navigate = useNavigate();

      const goToEvent = () => {
          navigate("/event")
      }
    return (
        <>
        <div>
        {toast && <Toast setToast={setToast} text={"클립보드에 복사되었습니다."}/>}
        <div className="header">
            <div className = "left">
                <div className='name'>{eventName}</div>
                <div className='date'>{startDate}~{endDate}</div>
            </div>
            <div className='right'>
                <button className='invite' onClick={copyUrl}> 
                    <FiLink size="22" color="white"/>
                </button>
                <button className='exit' onClick={openModal}> 
                    <AiOutlineSetting size="22" color="white"/>
                </button>
                {isRoomMaker ? 
                <button className='edit'>
                    <FaRegEdit size="22" color="white"/>
                </button> : <></>}
            </div>
            <EventModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                mainContent={"방을"}
                highlight={isRoomMaker? "폭파":""}
                end={isRoomMaker? "하시겠습니까?":"나가시겠습니까?"}
                notice={isRoomMaker? "※참여한 모든 인원이 자동으로 나가집니다." : "※지금까지 올린 리스트는 삭제됩니다."}
                action={goToEvent}
            />
        </div>
        </div>
        </>
    );
};
export default EventHeader;