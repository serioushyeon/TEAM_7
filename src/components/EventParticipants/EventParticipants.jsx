import "./EventParticipants.css";
import { useSelector } from "react-redux";
import defaultImage from "../../assets/images/Event/EventDefaultImg.png"; // src 폴더 안의 이미지 경로

const EventParticipants = () => {
  const users = useSelector((state) => state.eventList);
  const actualUserCount = users.userInfo.length;

  // 실제 참여자의 프로필 이미지 목록 생성
  const profileImages = users.userInfo
    .slice(0, 5) // 첫 5명의 참여자 이미지만 표시
    .map((user, index) => {
      const imageUrl = user.profileImgUrl || defaultImage; // 이미지 URL이 없으면 디폴트 이미지 사용
      return (
        <div className="box" key={index}>
          <img
            className="profile"
            src={imageUrl}
            alt={`Profile ${user.nickname || "User"}`} // 닉네임이 없으면 "User" 표시
          />
        </div>
      );
    });

  return (
    <>
      <div className="block">
        {profileImages}
        <div className="countbox">+{actualUserCount}</div>
      </div>
    </>
  );
};

export default EventParticipants;
