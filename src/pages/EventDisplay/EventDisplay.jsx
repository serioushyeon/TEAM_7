import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventHeader from "../../components/EventHeader/EventHeader";
import EventParticipants from "../../components/EventParticipants/EventParticipants";
import EventUploadList from "../../components/EventUploadList/EventUploadList";
import "./EventDisplay.css";
const EventDisplay = () => {
  //방장인지 참여자인지 체크
  //필요 데이터
  //1. 이벤트 id, 이벤트 명, 이벤트 기간, 방장 id, 현재 접속 id
  //2. 이벤트에 참여한 유저 목록(프로필 이미지, 닉네임 필요)
  //3. 이벤트에서 리스트를 추가한 유저(닉네임, 프로필 이미지, 올린 사진 목록)

  //   const navigate = useNavigate();
  //   // 로그인 상태와 사용자 정보를 저장할 스테이트
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const [userInfo, setUserInfo] = useState(null);

  //   useEffect(() => {
  //     // 여기에 로그인 상태를 확인하는 로직을 구현
  //     // 예를 들어, 로컬 스토리지나 세션 스토리지에서 토큰을 확인
  //     const token = localStorage.getItem("kakaoToken");
  //     if (!token) {
  //       // 토큰이 없으면 로그인 페이지로 리디렉션
  //       navigate("/");
  //     } else {
  //       // 토큰이 있으면 사용자 정보를 불러와서 저장
  //       setIsLoggedIn(true);
  //       // 예: 카카오 API를 사용하여 사용자 정보 가져오기
  //       fetchKakaoUserInfo(token).then((userInfo) => {
  //         setUserInfo(userInfo);
  //       });
  //     }
  //   }, []);

  //+버튼이 리스트 추가, 혹은 수정
  const [users, setUsers] = useState([
    {
      name: "user1",
      img: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/100",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/100",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
    {
      name: "user2",
      img: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
  ]); //유저 id, 올린 이미지 목록

  const onRemove = (name) => {
    setUsers(users.filter((user) => user.name !== name));
  };
  return (
    <>
      <div className="eventDisplayWrap">
        <EventHeader
          eventName={"경복궁 나들이"}
          startDate={"2023-11-05"}
          endDate={"2023-11-05"}
          isRoomMaker={true}
        />
        <EventParticipants
          users={[
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
          ]}
        />
        <EventUploadList users={users} onRemove={onRemove} isRoomMaker={true} />
      </div>
    </>
  );
};
export default EventDisplay;
