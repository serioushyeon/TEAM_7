import styled, { keyframes } from 'styled-components';
import EarthImoge from '../../assets/images/Login/earthSymbol.svg';
import Speaker from '../../assets/images/Login/loudspeaker.svg';
import ChatImoge from '../../assets/images/Login/ChatImoge.svg';
import Intro from '../../assets/images/Login/Introduce.svg';

// 아래 애니메이션이 끝난 후
const moveDown = keyframes`
  from {
    position: absolute;
    top: 8.5rem;
  }
  to {
    position: absolute;
    top: 15.5rem;
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

// 카카오랑 안내
const IntroAnimation = keyframes`
  from {
    transform: rotate(0deg);
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// background-color: #FDFCFB 0;
const BookContainer = styled.div`
display: flex;
position: absolute;
top: 6.5rem;
left: 0.9rem;
width: 90%;
height: 15rem;
border-radius: 4px;
background-color: #BEEAFC;
box-shadow: 8px 4px 4px 0px rgba(0, 0, 0, 0.50);

transition: transform 2s, width 2s; 
&.animate {
    animation: ${moveDown} 2s forwards;
  }
`
// transition : 애니메이션 지속 시간

const Earth = styled.div`
position: absolute;
top: 0.31rem;
left: 3.75rem;
width: 15.625rem;
height: 15.625rem;
background-repeat: no-repeat;
background-size: cover; 
background-position: center; 
background-image: url(${EarthImoge});
background-repeat: no-repeat;
scale: 0.6;

` 

const Introduce = styled.div`
position: absolute;
top: 0rem;
left: -2.5rem;
width: 468px;
height: 390px;
background-image: url(${Intro});
opacity: 0;
scale: 0.9;

transition: transform 2s, top 2s, left 2s; 
&.animate {
    animation: ${IntroAnimation} 2s forwards;
    animation-delay: 2.5s;
  }
`

const AnimateButton = styled.button`
position: absolute;
top: 0rem;
left: 0rem;
width: 22.5rem;
height: 15rem;
text-align: center;
align-items: center;
justify-contents: center;
box-shadow: 2px 2px rgba(255, 255, 255, 0.5); 
`

const LoudSpeaker = styled.div`
position: absolute;
width: 2.5rem;
height: 2.5rem;
top: 23rem;
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
top: 29.5rem;
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
    Introduce,
    AnimateButton,
    LoudSpeaker,
    ChatBox,
    Chatting,
    ChattingText,
    Normal,
    Bold
}