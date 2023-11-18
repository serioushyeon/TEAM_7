import styled from "styled-components";
import EditImoge from "../../assets/images/calendarPhoto/edit.svg";

// 기본 컨테이너
const Container = styled.div``;

// 배경색
const Bg = styled.div``;

// 12px 글씨 템플릿
const SmallText = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SettingText = styled.div`
  color: #5e5e5e;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

// 사진 전체를 포함하는 박스(나중에 사진 리스트로 바꿔서 이 컨테이너 내부로 정렬해주면 자동 정렬 됌.)
const DayPhotoConatiner = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  justify-content: space-between;
  top: 10.625rem;
  left: 2.5rem;
  width: 19.375rem;
  height: 26.25rem;
`;

// 사진 하나 크기(나중에 사진 url 가져와서 붙여주세요. 현재는 파란색)
const DayPhotoBox = styled.div`
  display: block;
  width: 8.75rem;
  height: 12.5rem;
  border-radius: 4px;
  /* background-color: blue; */
  border: 1px solid gray;
`;

// 메모 박스
const DayMemoBox = styled.textarea`
  position: absolute;
  top: 40.8rem;
  left: 1rem;
  width: 21.25rem;
  height: 5.5rem;
  border-radius: 4px;
  border: 1px solid #cbcbcb;
  outline: none;
  resize: none;
  background-color: #fff;
  color: #cbcbcb;
  font-family: Noto Sans KR;
  font-size: 12px;
  padding: 0.625rem;

  ::placeholder {
    color: #cbcbcb;
  }

  ${(props) =>
    !props.editable &&
    `
    border: none;
    background-color: transparent;
    top: 40rem;
    left: 1.1rem;
  `}
`;

const GalleyText = styled.div`
  position: absolute;
  top: 7.5rem;
  left: 1.43rem;
`;

const DayMemoText = styled.div`
  position: absolute;
  top: 38.5rem;
  left: 1.43rem;
`;
const MemoColor = styled.div`
  color: #cbcbcb;
  margin: 0.625rem;
`;

const HrLine = styled.hr`
  position: absolute;
  top: 8.75rem;
  left: 0.625rem;
  width: 23rem;
  background: #cbcbcb;
`;

const SecondHrLine = styled.hr`
  position: absolute;
  top: 636px;
  left: 0.625rem;
  width: 23rem;
  height: 1px;
  background: #cbcbcb;
`;
const CalendarButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.5rem;
  height: 2.5rem;
  border-radius: 4px;
  border: 1px solid #cbcbcb;
  color: #bababa;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DayDateColor = styled.div`
  color: #000;
`;

const DayDayWeek = styled.div`
  color: #022859;
`;

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  margin-top: 30px;
  gap: 20px;
`;

const DayCancleButton = styled.div`
  position: absolute;
  top: 48.75rem;
  left: 3.3125rem;
`;

const DaySaveButton = styled.div`
  position: absolute;
  top: 48.75rem;
  left: 12.6875rem;
`;

const EditButton = styled.div`
  position: absolute;
  top: 38.5rem;
  right: 1.43rem;
  width: 18px;
  height: 18px;
  background-image: url(${EditImoge});
`;

const StyledMaxLength = styled.div`
  position: absolute;
  display: flex;
  top: 46.3125rem;
  right: 1.375rem;
  color: #cbcbcb;
  font-family: Noto Sans KR;
  font-size: 12px;

  ${(props) =>
    !props.editable &&
    `
    display: none;
  `}
`;

export const S = {
  Container,
  Bg,
  SmallText,
  SettingText,
  GalleyText,
  DayMemoText,
  DayPhotoConatiner,
  DayPhotoBox,
  HrLine,
  SecondHrLine,
  DayMemoBox,
  MemoColor,
  DayDateColor,
  DayDayWeek,
  CalendarButtonStyle,
  DayCancleButton,
  DaySaveButton,
  EditButton,
  StyledMaxLength,
  DateContainer,
};
