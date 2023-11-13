import styled, { keyframes } from 'styled-components';
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
top: 8.5rem;
left: 0.9rem;
width: 22.5rem;
height: 35rem;
border-radius: 4px;
background-color: #DE684F;
box-shadow: 8px 4px 4px 0px rgba(0, 0, 0, 0.50);
`
// transition : 애니메이션 지속 시간

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
top: 48.5rem;
right: 1.18rem;
background-image: url(${ChatImoge});
background-repeat: no-repeat;
`


export const S = {
    Container,
    Bg,
    BookContainer,
    Earth,
    Kakao,
    LoudSpeaker,
    ChatBox
}