import styled from "styled-components";
import EarthImoge from "../../assets/images/Login/earthSymbol.svg";
import KakaoLogin from "../../assets/images/Login/kakaoLogin.svg";
import Speaker from "../../assets/images/Login/loudspeaker.svg";
import Chat from "../../assets/images/Login/ChatImoge.svg";
import Goorm from "../../assets/images/Login/TitleGoorm.svg";

const Container = styled.div`
height: calc(var(--vh, 1vh) * 100);
  overflow-y: hidden;
  background-size: cover;
`;

const Bg = styled.div`
`;
// background-color: #FDFCFB 0;
const BookContainer = styled.div`
  display: flex;
  position: absolute;
  top: 7.5rem;
  left: 0.9rem;
  width: 22.5rem;
  height: 15rem;
  border-radius: 4px;
  background-color: #beeafc;
  box-shadow: 8px 4px 4px 0px rgba(0, 0, 0, 0.5);
`;
// transition : 애니메이션 지속 시간

const Title = styled.div`
  display: flex;
  position: absolute;
  top: 1.625rem;
  right: 1rem;
  color: #191919;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Titletext = styled.div`
  display: block;
  position: absolute;
  top: 3.875rem;
  right: 1rem;
  color: #001c30;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TitleGoorm = styled.div`
  position: absolute;
  top: 1.625rem;
  right: 8rem;
  width: 40px;
  height: 32.239px;
  background-image: url(${Goorm});
`;

const Earth = styled.div`
  position: absolute;
  top: 0rem;
  scale: 0.8;
  left: 3.75rem;
  width: 15.625rem;
  height: 15.625rem;
  background-image: url(${EarthImoge});
  background-repeat: no-repeat;
`;

const Kakao = styled.div`
  position: absolute;
  top: 16.5rem;
  left: 1.8rem;
  width: 18.75rem;
  height: 2.875rem;
  background-image: url(${KakaoLogin});
  background-repeat: no-repeat;
`;

const LoudSpeaker = styled.div`
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  top: 28rem;
  left: 1.18rem;
  background-image: url(${Speaker});
  background-repeat: no-repeat;
`;

const ChatBox = styled.div`
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  top: 33.5rem;
  right: 1.18rem;
  margin-bottom: 5rem;
  background-image: url(${Chat});
  background-repeat: no-repeat;
`;

const Chatting = styled.div`
  display: inline-flex;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  flex-direction: row;
  position: absolute;
  border-radius: 4px;
  background-color: #ededed;
  padding: 0.75rem;
`;

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
`;

// 색상 컨테이너에도 display: flex를 해주어야 함.
const Normal = styled.div`
  display: flex;
  color: #0d0c00;
`;

const Bold = styled.div`
  display: flex;
  color: #001c30;
`;

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
  Bold,
};
