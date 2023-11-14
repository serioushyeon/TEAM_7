import styled from 'styled-components';

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

// 
const SettingText = styled.div`
color: #5E5E5E;
font-style: normal;
font-weight: 500;
line-height: normal;
`

// CalendarBoard용

const DayPhotoConatiner = styled.div`
display: flex;
flex-wrap: wrap;
position: absolute;
justify-content: space-between;
top: 170px;
left: 40px;
width: 310px;
height:420px;
`

const DayPhotoBox = styled.div`
display: block;
width: 140px;
height: 200px;
border-radius: 4px;
background-color: blue;
`

const DayMemoBox = styled.div`
position: absolute;
top: 650px;
left: 15px;
width: 360px;
height: 120px;
border : none;
background-color: transparent;
`

const GalleyText = styled.div`
position: absolute;
top: 120px;
left: 23px;
`

const DayMemoText = styled.div`
position: absolute;
top: 616px;
left: 23px;
`
const MemoColor = styled.div`
color: #CBCBCB;
margin: 10px;
`

const HrLine = styled.hr`
position: absolute;
top: 140px;
left: 10px;
width: 368px;
height: 1px;
background: #CBCBCB;
`

const SecondHrLine = styled.hr`
position: absolute;
top: 636px;
left: 10px;
width: 368px;
height: 1px;
background: #CBCBCB;
`
const CalendarButtonStyle = styled.div`
display: flex;            
justify-content: center;  
align-items: center;
width: 120px;
height: 40px;
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
top: 100px;
left: 153px;
color: #000;
`

const DayDayWeek = styled.div`
position: absolute;
top: 50px;
left: 175.5px;
color: #022859;
`
const DayCancleButton = styled.div`
position: absolute;
top: 780px;
left: 53px;
`

const DaySaveButton = styled.div`
position: absolute;
top: 780px;
left: 203px;
`

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
    DaySaveButton
}