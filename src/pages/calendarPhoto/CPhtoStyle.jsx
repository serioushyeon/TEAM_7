import styled from "styled-components";
import CameraImoge from "../../assets/images/calendarPhoto/camera.svg";

const Container = styled.div`
`;

const DayWeek = styled.div`
  color: #022859;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 100%;
  height: 40px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const SmallText = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DateColor = styled.div`
  display: flex;
  justify-content: center;
  color: #000;
`;

const SettingText = styled.div``;

const SettingPhoto = styled.div`
  display: flex;
  margin-top: 90px;
  margin-left: 30px;
  margin-bottom: 15px;
`;

const SettingMemo = styled.div`
  margin-top: 20px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PhotoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

// 사진 전체 컨테이너(나중에 배경색 바꿔주세요)
const PhotoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  width: 90%;
  height: 230px;
  align-items: center;
  justify-content: flex-start;
`;

// 포토박스(이 컴포넌트에 사진 넣으면 알아서 정렬됨(5개)
const AddPhotoBox = styled.div`
  display: flex;
  width: 30%;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #cbcbcb;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const CPhotoImage = styled.div`
  width: 42px;
  height: 42px;
  display: flex;

  background-image: url(${CameraImoge});
`;

// 사진 개수 카운트하는 글자 style
const CPhotoText = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  display: flex;
`;

// 대표 사진 텍스트
const RepresentativePhotoText = styled.div`
  color: white;
  background-color: #303030;
  text-align: center;
  padding: 4px;
  position: absolute;
  bottom: 0;
  width: 92%;
  height: 20px;
  border-radius: 0px 0px 4px 4px;
  font-size: 13px;
`;

const MemoBox = styled.textarea`
  border-radius: 4px;
  border: 1px solid #cbcbcb;
  outline: none;
  /* resize: none; */
  background-color: #fff;
  color: black;
  font-family: Noto Sans KR;
  font-size: 12px;
  padding: 0.625rem;
  width: 85%;
  /* margin-left: 20px; */
  margin-top: 10px;
  height: 100px;
  position: relative;

  ::placeholder {
    color: #cbcbcb;
  }
`;

const StyledMaxLength = styled.div`
  position: absolute; /* 절대 위치 설정 */
  bottom: 5px; /* 하단 여백 조절 */
  right: 40px; /* 우측 여백 조절 */
  color: gray;
  font-size: 12px;
`;

const UploadChange = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const UploadChangeItem = styled.div`
  width: 120px;
  height: 40px;
  border: 1px solid ${(props) => (props.isSelected ? "#F28B50" : "#cbcbcb")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  color: ${(props) => (props.isSelected ? "#F28B50" : "black")};
`;

export const S = {
  Container,
  DayWeek,
  SmallText,
  DateColor,
  SettingText,
  SettingPhoto,
  SettingMemo,
  PhotoContainer,
  AddPhotoBox,
  CPhotoText,
  CPhotoImage,
  RepresentativePhotoText,
  MemoBox,
  // CalendarButtonStyle,
  StyledMaxLength,
  UploadChange,
  UploadChangeItem,
  PhotoWrapper,
};
