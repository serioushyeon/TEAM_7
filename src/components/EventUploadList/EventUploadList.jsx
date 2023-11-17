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
import { useNavigate } from "react-router-dom";
import { setMyEvent } from "../../redux/myEventSlice";
import axios from "axios";

const EventUploadBlock = ({
  userId,
  nickname,
  imageUrlList,
  imageCount,
  loginUserId,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const eventId = useSelector((state) => state.myEvent.value.eventId);
  const getAccessCookie = localStorage.getItem("accessCookie");
  let stompClient = null;

  useEffect(() => {
    console.log("Event ID:", eventId);
  }, [eventId]);

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (e) => {
    const newCheckStatus = e.target.checked;
    setIsChecked(newCheckStatus);

    // 체크 상태를 WebSocket을 통해 서버에 전송
    sendCheckStatus(userId, newCheckStatus);
  };

  // 체크 상태를 서버에 전송하는 함수
  const sendCheckStatus = (userId, checkStatus) => {
    stompClient.send(
      `/topic/check/${eventId}`,
      {},
      JSON.stringify({ userId, checkStatus })
    );
  };
  useEffect(() => {
    const socket = new SockJS("/ws-check");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe(`/subscribe/check/${eventId}`, (message) => {
        const messageBody = JSON.parse(message.body);
        if (messageBody.userId === userId) {
          setIsChecked(messageBody.checkStatus === "true");
        }
      });
    });

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
  const deleteEventBlockData = async () => {
    try {
      const response = await axios.delete(
        `/api/v1/event/${eventId}/${userId}/image-list}`,
        {
          headers: {
            Authorization: `Bearer ${getAccessCookie}`,
          },
        }
      );
      dispatch(setUserInfo(response.data));
      navigate(`/eventdisplay/${eventId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="list">
      <div className="uploadlist">
        <div className="done">
          <input
            type="checkbox"
            id="check_btn"
            checked={isChecked}
            onChange={handleCheckboxChange}
            disabled={userId !== loginUserId} // 다른 사용자의 리스트에서는 비활성화
          />
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
        action={deleteEventBlockData}
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
  const navigate = useNavigate();

  const eventId = useSelector((state) => state.myEvent.value.eventId);

  // 사용자가 이미지를 업로드했는지 확인
  const hasUserUploadedImages = userInfo.some(
    (user) => user.userId === loginUserId
  );

  const navigateToEventPhoto = () => {
    navigate(`/eventphoto/${eventId}`);
  };

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
          // 리스트 클릭 시 EventPhoto 페이지로 이동
          onClick={user.userId === loginUserId ? navigateToEventPhoto : null}
        />
      ))}
      {userInfo.length === 0 && <NoList />}
      <div className="addList" onClick={navigateToEventPhoto}>
        <button className="addListBtn">
          <IoIosAddCircleOutline size="40" color="#F28B50" />
        </button>
      </div>
    </div>
  );
};

export default EventUploadList;
