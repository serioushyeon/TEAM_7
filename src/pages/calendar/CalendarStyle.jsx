import styled from "styled-components";
import Background from "../../assets/images/calendar/Background.svg";
import leftArrow from "../../assets/images/calendar/leftArrow.svg";
import rightArrow from "../../assets/images/calendar/rightArrow.svg";

// 기존에 Calendar에 max 사이즈에 대한 css를 넣으면 계속 왼쪽 정렬이 되었는데,
// 컨테이너에 relative 속성을 넣으니 중앙정렬이 되었음.(원인이 뭘까)
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 390px;
  max-height: 1080px;
`

const BackImage = styled.div`
  position: absolute;
  top:0;
  left:0;
  width: 390px;
  height: 1080px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${Background});
`

const CalendarImage = styled.img`
position: absolute;
margin-left: 11rem;
top: 5rem;
width: 48px;
height: 48px;
`

const CalendarText = styled.div`
color: var(--gray-scale-gray-100, #EDEDED);
font-family: Noto Sans KR;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
position: absolute;
top: 8rem;
margin-left: 10.4rem;
`

const StyledSelect = styled.button`
position: absolute;
top: 12.5rem;
margin-left: 3.5rem;
width: 10rem;
height: 2.8rem;
border-radius: 4px;
border: 1px solid var(--gray-scale-gray-300-border, #CBCBCB);
background: transparent;
color: #CBCBCB;
text-align: center;
`;

const AddBarcord = styled.button`
margin-top: 3rem;
margin-left: 7.2rem;
margin-bottom: 7.2rem;
width: 10rem;
height: 2.8rem;
border-radius: 4px;
border: 1px solid var(--gray-scale-gray-300-border, #CBCBCB);
background: transparent;
color: #CBCBCB;
text-align: center;
`;

const StyledOptions = styled.button`
width: 10rem;
height: 2.8rem;
border-radius: 4px;
border: 1px solid var(--gray-scale-gray-300-border, #CBCBCB);
background: transparent;
color: #CBCBCB;
text-align: center;
`;

const StyledOptionsList = styled.li`
text-align: left;
`;

const StyledOptionsBox = styled.ul`
// 점 제거
background-color: white;
list-style-type: none;
position: absolute;
top: 14rem;
margin-left: 3.5rem;
width: 160px;
height: 360px;
padding: 0;
overflow: auto;

&::-webkit-scrollbar {
  display: none; /* 크롬, 사파리 등 */
}
-ms-overflow-style: none; /* IE, 엣지 */
scrollbar-width: none; /* 파이어폭스 */

display: ${props => props.show ? 'block' : 'none'};
`
// ul에 padding: 0을 지정해야 기존의 점 여백이 사라짐.

const StyledLeftButton = styled.button`
background-image: url(${leftArrow});
width: 12px;
height: 14px;
position: absolute;
top: 13.4rem;
margin-left: 14.8rem;
`
const StyledRightButton = styled.button`
background-image: url(${rightArrow});
width: 12px;
height: 14px;
position: absolute;
top: 13.4rem;
margin-left: 16rem;
`

const DayImage = styled.img`
max-width: 130%;  /* 부모 요소의 최대 너비 */
height: auto;     /* 원본 비율 유지 */
width: auto;      /* 원본 비율 유지 */
objectFit: 'cover';
backgroundSize: 'contain';
margin-left: -0.4rem;
margin-top: 0.4rem;
`

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
    DayImage
}