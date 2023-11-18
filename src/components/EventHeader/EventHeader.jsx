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
import { useDispatch } from "react-redux";
import axios from "axios";

const EventHeader = () => {
    return (
        <>
        <div>
        <div className="header">
            <div className = "left">
                <div className='name'>이벤트 목록</div>
                <div className='date'>이벤트를 공유하여 무코를 만들어보세요</div>
            </div>
            <div className='right'>
            </div>
        </div>
        </div>
        </>
    );
};
export default EventHeader;