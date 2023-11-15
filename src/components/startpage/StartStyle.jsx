import styled, { keyframes } from 'styled-components';
import EarthImoge from '../../assets/images/Login/earthSymbol.svg';
import Speaker from '../../assets/images/Login/loudspeaker.svg';
import ChatImoge from '../../assets/images/Login/ChatImoge.svg';


// 아래 애니메이션이 끝난 후
const moveDown = keyframes`
  from {
    position: absolute;
    top: 8.5rem;
    transform: translateY(90deg); // 현재 위치에서 시작
  }
  to {
    position: absolute;
    top: 22.5rem;
    transform: translateY(90deg);
  }
`;

// 책자
const rotateAndShrink = keyframes`
  from {
    transform: rotate(0deg);
    height: 35rem;
    width: 22.5rem;
    left: 0.9rem;
  }
  to {
    transform: rotate(90deg);
    height: 22.5rem; 
    width: 15rem;
    left: 4.7rem;
  }
`;

// 지구본
const Earthrotate = keyframes`
  from {
    transform: rotate(0deg) scale(1);
    top: 7.31rem;
    left: 3.75rem;
  }
  to {
    transform: rotate(90deg) scale(0.666667);
    top: 1.3rem; // 예시로 50%로 설정, 필요에 따라 조정 가능
    left: -0.5rem;
  }
`;

// 카카오랑 안내
const Kakaorotate = keyframes`
  from {
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    opacity: 0;
    top: 50rem;
  }
`;

// background-color: #FDFCFB 0;
const BookContainer = styled.div`
display: flex;
position: absolute;
top: 8.5rem;
left: 0.9rem;
width: 22.5rem;
height: 35rem;
border-radius: 4px;
background-color: #BEEAFC;
box-shadow: 8px 4px 4px 0px rgba(0, 0, 0, 0.50);

transition: transform 2s, width 2s; 
&.animate {
    animation: ${rotateAndShrink} 2s forwards, ${moveDown} 2s 2s forwards;
  }
`
// transition : 애니메이션 지속 시간

const Earth = styled.div`
position: absolute;
top: 7.31rem;
left: 3.75rem;
width: 15.625rem;
height: 15.625rem;
background-repeat: no-repeat;
background-size: cover; 
background-position: center; 
background-image: url(${EarthImoge});
background-repeat: no-repeat;

transition: transform 2s, top 2s, left 2s; 
&.animate {
    animation: ${Earthrotate} 2s forwards;
  }
` 

const AnimateButton = styled.div`
position: absolute;
top: 1rem;
left: 0rem;
width: 22.5rem;
height: 35rem;
text-align: center;
align-items: center;
justify-contents: center;
box-shadow: 2px 2px rgba(255, 255, 255, 0.5); 

transition: transform 0.5s, top 2s;
&.animate {
    animation: ${Kakaorotate} 0.5s forwards;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0); 
  }
`

const Title = styled.div`
display: flex;
position: absolute;
top: 2.625rem;
left: 5.2rem;
color: #191919;
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const MoodTitle = styled.div`
color : #DE684F;
margin-right: 0.3rem;
`


const Titletext = styled.div`
display: flex;
position: absolute;
top: 5.875rem;
left: 11.35rem;
color: #191919;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const MoodText = styled.div`
color : #DE684F;
margin-left: 0.3rem;
`

const LoudSpeaker = styled.div`
position: absolute;
width: 2.5rem;
height: 2.5rem;
top: 45rem;
left: 1.18rem;
background-image: url(${Speaker});
background-repeat: no-repeat;

transition: transform 0.5s, top 2s;
&.animate {
    animation: ${Kakaorotate} 0.5s forwards;
  }
`

const ChatBox = styled.div`
position: absolute;
width: 2.5rem;
height: 2.5rem;
top: 51.5rem;
right: 1.18rem;
background-image: url(${ChatImoge});
background-repeat: no-repeat;

transition: transform 0.5s, top 2s;
&.animate {
    animation: ${Kakaorotate} 0.5s forwards;
  }
`


const Chatting = styled.div`
display: inline-flex;
top: ${(props) => props.top};
left: ${(props) => props.left};
flex-direction: row;
position: absolute;
border-radius: 4px;
background-color: #EDEDED;
padding: 0.75rem;

transition: transform 0.5s, top 2s;
&.animate {
    animation: ${Kakaorotate} 0.5s forwards;
  }
`

// 12px로 하니 화면을 넘어감.
const ChattingText = styled.div`
display: inline-flex;
white-space: nowrap;
width: auto;
font-family: Noto Sans KR;
font-size: 10px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

// 색상 컨테이너에도 display: flex를 해주어야 함.
const Normal = styled.div`
display: flex;
color: #0D0C00;
`

const Bold = styled.div`
display: flex;
color: #001C30;
`



export const S = {
    BookContainer,
    Earth,
    AnimateButton,
    Title,
    Titletext,
    MoodTitle,
    MoodText,
    LoudSpeaker,
    ChatBox,
    Chatting,
    ChattingText,
    Normal,
    Bold
}