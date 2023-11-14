import styled from 'styled-components';
import EditImoge from '../../assets/images/calendarPhoto/edit.svg'

// 기본 컨테이너
const Container = styled.div`
position: relative;
display: flex;
align-items: center;
margin: 0 auto;
max-width: 390px;
max-height: 844px;
height: 100%;
flex-direction: column;
`

// 배경색
const Bg = styled.div`
position: absolute;
width: 390px;
height: auto;
background-color: white;
`

// 12px 글씨 템플릿
const SmallText = styled.div`
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
`


const SettingText = styled.div`
color: #5E5E5E;
font-style: normal;
font-weight: 500;
line-height: normal;
`

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
`

// 사진 하나 크기(나중에 사진 url 가져와서 붙여주세요. 현재는 파란색)
const DayPhotoBox = styled.div`
display: block;
width: 8.75rem;
height: 12.5rem;
border-radius: 4px;
background-color: blue;
`

// 메모 박스
const DayMemoBox = styled.textarea`
position: absolute;
top: 40.8rem;
left: 1rem;
width: 21.25rem;
height: 5.5rem;
border-radius: 4px;
border: 1px solid #CBCBCB;
outline: none;
resize: none;
background-color: #FFF;
color: #CBCBCB;
font-family: Noto Sans KR;
font-size: 12px;
padding: 0.625rem;

::placeholder {
    color: #CBCBCB;
}

  ${props => !props.editable && `
    border: none;
    background-color: transparent;
    top: 40rem;
    left: 1.1rem;
  `}
`

const GalleyText = styled.div`
position: absolute;
top: 7.5rem;
left: 1.43rem;
`

const DayMemoText = styled.div`
position: absolute;
top: 38.5rem;
left: 1.43rem;
`
const MemoColor = styled.div`
color: #CBCBCB;
margin: 0.625rem;
`

const HrLine = styled.hr`
position: absolute;
top: 8.75rem;
left: 0.625rem;
width: 23rem;
background: #CBCBCB;
`

const SecondHrLine = styled.hr`
position: absolute;
top: 636px;
left: 0.625rem;
width: 23rem;
height: 1px;
background: #CBCBCB;
`
const CalendarButtonStyle = styled.div`
display: flex;            
justify-content: center;  
align-items: center;
width: 7.5rem;
height: 2.5rem;
border-radius: 4px;
border: 1px solid #CBCBCB;
color: #BABABA;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
` 

const DayDateColor = styled.div`
position: absolute;
top: 6.25rem;
left: 9.56rem;
color: #000;
`

const DayDayWeek = styled.div`
position: absolute;
top: 3.125rem;
left: 10.9687rem;
color: #022859;
`
const DayCancleButton = styled.div`
position: absolute;
top: 48.75rem;
left: 3.3125rem;
`

const DaySaveButton = styled.div`
position: absolute;
top: 48.75rem;
left: 12.6875rem;
`

const EditButton = styled.div`
position: absolute;
top: 38.5rem;
right: 1.43rem;
width: 18px;
height: 18px;
background-image: url(${EditImoge});
`

const StyledMaxLength = styled.div`
  position: absolute;
  display: flex;
  top: 46.3125rem;
  right: 1.375rem;
  color: #CBCBCB;
  font-family: Noto Sans KR;
  font-size: 12px;

  ${props => !props.editable && `
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
    StyledMaxLength
}