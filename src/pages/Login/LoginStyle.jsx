import styled from 'styled-components';
import EarthImoge from '../../assets/images/Login/earthSymbol.svg';
import KakaoLogin from '../../assets/images/Login/kakaoLogin.svg';
import Speaker from '../../assets/images/Login/loudspeaker.svg';
import ChatImoge from '../../assets/images/Login/ChatImoge.svg';

const Container = styled.div`
position: relative;
display: flex;
align-items: center;
margin: 0 auto;
max-width: 390px;
max-height: 1080px;
width: 100%;
`

const Bg = styled.div`
display: flex;
width: 390px;
height: 1080px;
background-color: red;
`
// background-color: #FDFCFB 0;
const BookContainer = styled.div`
display: flex;
position: absolute;
top: 14.5rem;
left: 0.9rem;
width: 22.5rem;
height: 35rem;
border-radius: 4px;
background-color: #DE684F;
box-shadow: 8px 4px 4px 0px rgba(0, 0, 0, 0.50);
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

const Title = styled.div`
display: flex;
position: absolute;
top: 5.625rem;
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
top: 8.875rem;
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
top: 39rem;
left: 0;
background-image: url(${Speaker});
background-repeat: no-repeat;
`

const ChatBox = styled.div`
position: absolute;
width: 2.5rem;
height: 2.5rem;
top: 42.8rem;
left: 20.275rem;
background-image: url(${ChatImoge});
background-repeat: no-repeat;
`


export const S = {
    Container,
    Bg,
    BookContainer,
    Earth,
    Kakao,
    Title,
    Titletext,
    MoodTitle,
    MoodText,
    LoudSpeaker,
    ChatBox
}