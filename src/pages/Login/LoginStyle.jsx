import styled from 'styled-components';
import EarthImoge from '../../assets/images/Login/earthSymbol.svg';
import KakaoLogin from '../../assets/images/Login/kakaoLogin.svg';
import Speaker from '../../assets/images/Login/loudspeaker.svg';
import Chat from '../../assets/images/Login/chatImoge.svg';
import Goorm from '../../assets/images/Login/TitleGoorm.svg';

const Container = styled.div`
position: relative;
display: flex;
align-items: center;
margin: 0 auto;
max-width: 390px;
max-height: 1020px;
width: 100%;
height: 100vh;
`

const Bg = styled.div`
display: flex;
width: 390px;
height: 1020px;
background-color: #FDFCFB;
`
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
`
// transition : 애니메이션 지속 시간

const Title = styled.div`
display: flex;
position: absolute;
top: 2.625rem;
right: 1rem;
color: #191919;
font-size: 28px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const Titletext = styled.div`
display: block;
position: absolute;
top: 4.875rem;
right: 1rem;
color: #001C30;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
`

const TitleGoorm = styled.div`
position: absolute;
top: 2.625rem;
right: 8rem;
width: 40px;
height: 32.239px;
background-image: url(${Goorm});
`

const Earth = styled.div`
position: absolute;
top: 7.31rem;
left: 3.75rem;
width: 15.625rem;
height: 15.625rem;
background-image: url(${EarthImoge});
background-repeat: no-repeat;
` 

const Kakao = styled.div`
position: absolute;
top: 28.5rem;
left: 1.8rem;
width: 18.75rem;
height: 2.875rem;
background-image: url(${KakaoLogin});
background-repeat: no-repeat;
`

const LoudSpeaker = styled.div`
position: absolute;
width: 2.5rem;
height: 2.5rem;
top: 45rem;
left: 1.18rem;
background-image: url(${Speaker});
background-repeat: no-repeat;
`

const ChatBox = styled.div`
position: absolute;
width: 2.5rem;
height: 2.5rem;
top: 51.5rem;
right: 1.18rem;
background-image: url(${Chat});
background-repeat: no-repeat;
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
    Container,
    Bg,
    BookContainer,
    Title,
    Titletext,
    TitleGoorm,
    Earth,
    Kakao,
    LoudSpeaker,
    ChatBox,
    Chatting,
    ChattingText,
    Normal,
    Bold
}