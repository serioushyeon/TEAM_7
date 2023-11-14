import { useState } from "react";
import EventHeader from "../../components/EventHeader/EventHeader"
import EventParticipants from "../../components/EventParticipants/EventParticipants";
import EventUploadList from "../../components/EventUploadList/EventUploadList";
import './EventDisplay.css';
const EventDisplay = () => {
    //방장인지 참여자인지 체크
    //필요 데이터
    //1. 이벤트 id, 이벤트 명, 이벤트 기간, 방장 id, 현재 접속 id
    //2. 이벤트에 참여한 유저 목록(프로필 이미지, 닉네임 필요)
    //3. 이벤트에서 리스트를 추가한 유저(닉네임, 프로필 이미지, 올린 사진 목록)

    //+버튼이 리스트 추가, 혹은 수정
    const [users, setUsers] = useState([
        {name: "user1", 'img' : 
        ["https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"
        ,"https://via.placeholder.com/100","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"
        ,"https://via.placeholder.com/100","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150","https://via.placeholder.com/150"]}, 
        {name: "user2", 'img' : ["https://via.placeholder.com/150","https://via.placeholder.com/150"]} 
    ]); //유저 id, 올린 이미지 목록


    const onRemove = (name) => {
        setUsers(users.filter((user)=> user.name !== name));
    };   
    return (
        <>
            <div className="eventDisplayWrap">
                <EventHeader 
                    eventName = {"경복궁 나들이"}
                    startDate = {"2023-11-05"}
                    endDate = {"2023-11-05"}
                    isRoomMaker = {true} />
                <EventParticipants users = {
                    ["https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150"]
                }/>
                <EventUploadList users = {users} onRemove={onRemove} isRoomMaker={true}/>
            </div>
        </>
    );
};
export default EventDisplay