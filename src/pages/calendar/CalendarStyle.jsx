import styled from "styled-components";
import Background from "../../assets/images/calendar/Background.svg";
import leftArrow from "../../assets/images/calendar/leftArrow.svg";
import rightArrow from "../../assets/images/calendar/rightArrow.svg";
import Delete from "../../assets/images/calendarPhoto/delete.svg";

// 기존에 Calendar에 max 사이즈에 대한 css를 넣으면 계속 왼쪽 정렬이 되었는데,
// 컨테이너에 relative 속성을 넣으니 중앙정렬이 되었음.(원인이 뭘까)
const Container = styled.div``;

const BackImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 390px;
  height: 844px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${Background});
`;

const CalendarImage = styled.img`
  position: absolute;
  margin-left: 11rem;
  top: 1rem;
  width: 48px;
  height: 48px;
  transform: scale(0.7);
`;

const CalendarText = styled.div`
  color: var(--gray-scale-gray-100, #ededed);
  font-family: Noto Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  top: 4rem;
  margin-left: 10.5rem;
`;

const StyledSelect = styled.button`
  position: absolute;
  top: 7.5rem;
  margin-left: 3.5rem;
  width: 10rem;
  height: 2.8rem;
  border-radius: 4px;
  border: 1px solid #cbcbcb;
  background: transparent;
  color: #cbcbcb;
  text-align: center;
`;

const AddBarcord = styled.button`
  position: absolute;
  left: 7.2rem;
  bottom: 5.2rem;
  width: 10rem;
  height: 2.8rem;
  border-radius: 4px;
  background: transparent;
  border: 1px solid #cbcbcb;
  opacity: ${(props) => (props.disabled ? "1;" : "0.5;")};
  color: #cbcbcb;
  text-align: center;
`;

const StyledOptions = styled.button`
  width: 6.25rem;
  height: 1.8125rem;
  border-radius: 4px;
  background: rgba(221, 221, 221, 0.1);
  color: #cbcbcb;
  text-align: center;
`;

const StyledOptionsList = styled.li`
  text-align: center;
  margin: 0.4rem;
`;

const StyledOptionsBox = styled.div`
  position: absolute;
  top: 10rem;
  left: 4.7rem;
  width: 15rem;
  height: 29.625rem;
  border-radius: 4px;
  border: 1px solid var(--BasicWhiteFontColor, #fff);
  background: rgba(0, 0, 0, 0.66);
  z-index: 100;
`;
// ul에 padding: 0을 지정해야 기존의 점 여백이 사라짐.

const StyledLeftButton = styled.button`
  background-image: url(${leftArrow});
  width: 12px;
  height: 14px;
  position: absolute;
  top: ${(props) => props.top};
  margin-left: ${(props) => props.left};
`;
//top: 8.5rem; margin-left: 14.8rem;
const StyledRightButton = styled.button`
  background-image: url(${rightArrow});
  width: 12px;
  height: 14px;
  position: absolute;
  top: ${(props) => props.top};
  margin-left: ${(props) => props.left};
`;
// top: 8.5rem; margin-left: 16rem;

const StyledYear = styled.div`
  position: absolute;
  width: 15rem;
  height: 3rem;
  display: flex;
  align-items: center;
`;

const YearText = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  margin-left: ${(props) => props.left};
  color: var(--gray-scale-gray-100, #ededed);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const StyledMonth = styled.ul`
  position: absolute;
  top: 2rem;
  list-style-type: none;
  width: 15rem;
  height: 24rem;
  align-items: center;
  padding: 0;
  overflow: auto;
  z-index: 50;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리 등 */
  }
  -ms-overflow-style: none; /* IE, 엣지 */
  scrollbar-width: none; /* 파이어폭스 */
`;

const DayWrapper = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const DayImage = styled.img`
  max-width: 100%;
  height: 70%;
  width: 130%;
  object-fit: "cover";
  background-size: "contain";
  background-position: center center;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 12px;
  height: 12px;
  background-image: url(${Delete});
  z-index: 500;
`;

export const S = {
  Container,
  BackImage,
  CalendarImage,
  CalendarText,
  StyledSelect,
  AddBarcord,
  StyledOptions,
  StyledOptionsList,
  StyledOptionsBox,
  StyledLeftButton,
  StyledRightButton,
  DayImage,
  StyledYear,
  StyledMonth,
  YearText,
  DeleteButton,
  DayWrapper,
};
