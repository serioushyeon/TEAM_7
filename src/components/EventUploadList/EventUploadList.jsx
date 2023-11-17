//본인이 올린 것이어야 삭제 가능
//->현재 접속 닉네임과 리스트의 닉네임이 일치해야 삭제 버튼 활성화
//닉네임을 몇자까지 표시할 것인지
//완료버튼 추가하기
import "./EventUploadList.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaTrashAltSolid } from "react-icons/lia";
import { useState, useEffect } from "react";
import EventModel from "../EventModal/EventModal";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EventUploadBlock = ({
  userId,
  nickname,
  imageUrlList,
  checkStatus,
  imageCount,
  loginUserId,
}) => {
  const [isChecked, setIsChecked] = useState(imageCount >= 30);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { id: eventId } = useParams(); // 이벤트 ID
  const users = useSelector((state) => state.eventList);

  // 체크 상태 업데이트를 위한 WebSocket 연결
  useEffect(() => {
    const socket = new SockJS("/ws-check");
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      function (frame) {
        console.log("Connected: " + frame);
        stompClient.subscribe(
          `/subscribe/check/${eventId}`,
          function (message) {
            const messageBody = JSON.parse(message.body);
            if (messageBody.userId === userId) {
              setIsChecked(messageBody.checkStatus === "true");
            }
          }
        );
      },
      function (error) {
        console.error("WebSocket error:", error);
      }
    );

    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, [eventId, userId]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className="list">
      <div className="uploadlist">
        <div className="done">
          <input type="checkbox" id="check_btn" checked={isChecked} readOnly />
        </div>
        <div className="nicknameBox">
          나는 <span className="nickname">{nickname}</span>이야!
        </div>
        <div className="count">+{imageCount}</div>
        {userId == loginUserId ? (
          <div className="btn">
            <button className="deleteBtn" onClick={openModal}>
              <LiaTrashAltSolid size="24" color="white" />
            </button>
          </div>
        ) : (
          <div className="btn"></div>
        )}
      </div>
      <EventModel
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        mainContent={"리스트를"}
        highlight={"삭제"}
        end={"하시겠습니까?"}
        notice={"※ 한 번 삭제한 리스트는 되돌릴 수 없어요."}
        action={reloadPage}
      />
    </div>
  );
};

const NoList = () => {
  return (
    <div className="list">
      <div className="uploadlist">
        <div className="noList">아직 생성된 리스트가 없습니다.</div>
      </div>
    </div>
  );
};

// EventDisplay로부터 props를 받아옵니다.
const EventUploadList = ({ userInfo, loginUserId }) => {
  return (
    <div className="eventUploadList">
      {userInfo.map((user) => (
        <EventUploadBlock
          key={user.userId}
          userId={user.userId}
          nickname={user.nickname}
          imageUrlList={user.imageUrlList}
          checkStatus={user.checkStatus}
          imageCount={user.imageCount}
          loginUserId={loginUserId}
        />
      ))}
      {userInfo.length === 0 && (
        <div className="list">
          <div className="uploadlist">
            <div className="noList">아직 생성된 리스트가 없습니다.</div>
          </div>
        </div>
      )}
      <div className="addList">
        <button className="addListBtn">
          <IoIosAddCircleOutline size="40" color="#F28B50" />
        </button>
      </div>
    </div>
  );
};

export default EventUploadList;
