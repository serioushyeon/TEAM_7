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
top: 3.375rem;
left: 11.28rem;
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
top: 7.5rem;
left: 9.9rem;
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
top: 13.23rem;
left: 1.43rem;
`

const SettingMemo = styled.div`
position: absolute;
top: 33.20rem;
left: 1.43rem;
`

// 사진 전체 컨테이너(나중에 배경색 바꿔주세요)
const PhotoContainer = styled.div`
display: flex;
position: absolute;
flex-wrap: wrap;
gap: 0.7rem;
top: 15.125rem;
left: 01rem;
width: 21.2rem;
height: 14.5rem;
background-color: blue;
padding: 0.5rem;
`

// 포토박스(이 컴포넌트에 사진 넣으면 알아서 정렬됨(5개)
const AddPhotoBox = styled.div`
display: block;
width: 6.25rem;
height: 6.25rem;
border-radius: 4px;
border: 1px solid #CBCBCB;
background-color: #FAFAFA;
`

const CPhotoImage = styled.div`
width: 42px;
height: 42px;
position: absolute;
left: 2.4rem;
top: 2.2rem;
background-image: url(${CameraImoge});

`

// 사진 개수 카운트하는 글자 style
const CPhotoText = styled.div`
position: absolute;
left: 5rem;
top: 5.2rem;
color: rgba(0, 0, 0, 0.50);
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 400;
`

// 대표사진 표시 박스(추후 위치 지정 해야함)
const RepresentativePhotoBox = styled.div`
width: 6.25rem;
height: 1.625rem;
border-radius: 0px 0px 4px 4px;
background: #303030;
align-items: center;
text-align: center;
`

// 대표 사진 텍스트
const RepresentativePhotoText = styled.div`
color: #FFF;
font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 400;
`

const MemoBox = styled.textarea`
position: absolute;
top: 35rem;
left: 0.93rem;
width: 21.25rem;
height: 5.6rem;
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

const CancleButton = styled.div`
position: absolute;
top: 46.25rem;
left: 3.3125rem;
`

const SaveButton = styled.div`
position: absolute;
top: 46.25rem;
left: 12.68rem;
`

const StyledMaxLength = styled.div`
  position: absolute;
  display: flex;
  top: 40.7rem;
  right: 1.375rem;
  color: #CBCBCB;
  font-family: Noto Sans KR;
  font-size: 12px;
`;

export const S = {
    Container,
    Bg,
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
    RepresentativePhotoBox,
    RepresentativePhotoText,
    MemoBox,
    CalendarButtonStyle,
    CancleButton,
    SaveButton,
    StyledMaxLength
}