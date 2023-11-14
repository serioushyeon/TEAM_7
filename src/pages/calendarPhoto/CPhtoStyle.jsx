import styled from 'styled-components';
import CameraImoge from '../../assets/images/calendarPhoto/camera.svg';

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

const Bg = styled.div`
position: absolute;
width: 390px;
height: auto;
background-color: white;
`

const DayWeek = styled.div`
position: absolute;
top: 114px;
left: 162.5px;
color: #022859;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const SmallText = styled.div`
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const DateColor = styled.div`
position: absolute;
top: 170px;
left: 153px;
color: #000;
`

const SettingText = styled.div`
color: #5E5E5E;
font-style: normal;
font-weight: 500;
line-height: normal;
`

const SettingPhoto = styled.div`
position: absolute;
top: 248.5px;
left: 23px;
`

const SettingMemo = styled.div`
position: absolute;
top: 518.5px;
left: 23px;
`

const AddPhotoBox = styled.div`
position: absolute; 
top: 290px;
left: 23px;
width: 100px;
height: 100px;
border-radius: 4px;
border: 1px solid #CBCBCB;
background-color: #FAFAFA;
`

const CPhotoImage = styled.div`
width: 42px;
height: 42px;
position: absolute;
right: 28px;
top: 16px;
background-image: url(${CameraImoge});

`

const CPhotoText = styled.div`
position: absolute;
right: 38px;
bottom: 17px;
color: rgba(0, 0, 0, 0.50);
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 400;
`

const RepresentativePhotoBox = styled.div`
width: 100px;
height: 26px;
border-radius: 0px 0px 4px 4px;
background: #303030;
`

const RepresentativePhotoText = styled.div`
color: #FFF;
font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 400;
`

const MemoBox = styled.div`
position: absolute;
top: 560px;
left: 15px;
width: 360px;
height: 120px;
border-radius: 4px;
border: 1px solid #CBCBCB;
background-color: #FFF;
`

const MemoColor = styled.div`
color: #CBCBCB;
margin: 10px;
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

const CancleButton = styled.div`
position: absolute;
top: 740px;
left: 53px;
`

const SaveButton = styled.div`
position: absolute;
top: 740px;
left: 203px;
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

const DayDateColor = styled.div`
position: absolute;
top: 90px;
left: 153px;
color: #000;
`

const DayDayWeek = styled.div`
position: absolute;
top: 50px;
left: 175.5px;
color: #022859;
`

export const S = {
    Container,
    Bg,
    DayWeek,
    SmallText,
    DateColor,
    SettingText,
    SettingPhoto,
    SettingMemo,
    AddPhotoBox,
    CPhotoText,
    CPhotoImage,
    RepresentativePhotoBox,
    RepresentativePhotoText,
    MemoBox,
    MemoColor,
    CalendarButtonStyle,
    CancleButton,
    SaveButton,

    GalleyText,
    DayMemoText,
    DayPhotoConatiner,
    DayPhotoBox,
    HrLine,
    SecondHrLine,
    DayMemoBox,
    DayDateColor,
    DayDayWeek
}