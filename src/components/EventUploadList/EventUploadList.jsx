//본인이 올린 것이어야 삭제 가능
//->현재 접속 닉네임과 리스트의 닉네임이 일치해야 삭제 버튼 활성화
//닉네임을 몇자까지 표시할 것인지
//완료버튼 추가하기
import "./EventUploadList.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaTrashAltSolid } from "react-icons/lia";
import { useState, useEffect } from "react";
import EventModel from "../EventModal/EventModal";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const EventUploadBlock = ({
  userId,
  nickname,
  imageUrlList,
  checkStatus,
  imageCount,
  loginUserId,
  onCheckStatusChange,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const reloadPage = () => {
    location.reload();
  };

  // 클라이언트에서 체크 소켓 연결
  const socket = io("/ws-check");

  // 이미지 개수가 30개 이상이면 checkbox를 활성화
  useEffect(() => {
    if (imageCount >= 30) {
      setIsChecked(true);
      console.log(`Sending check status for user ${userId}: true`);
      socket.emit("checkStatusChanged", { userId, checkStatus: true });
    }
  }, [imageCount, socket, userId]);

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

const EventUploadList = () => {
  const users = useSelector((state) => state.eventList);

  return (
    <>
      <div className="eventUploadList">
        {users.userInfo.map((userInfo) => (
          <EventUploadBlock
            userId={userInfo.userId}
            nickname={userInfo.nickname}
            imageUrlList={userInfo.imageUrlList}
            checkStatus={userInfo.checkStatus}
            imageCount={userInfo.imageCount}
            loginUserId={users.loginUserId}
          />
        ))}
        {users.userInfo.length === 0 ? <NoList /> : <></>}
        <div className="addList">
          <button className="addListBtn">
            <IoIosAddCircleOutline size="40" color="#F28B50" />
          </button>
        </div>
      </div>
    </>
  );
};

export default EventUploadList;
