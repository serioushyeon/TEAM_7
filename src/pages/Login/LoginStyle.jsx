import { styled } from "styled-components";
import EarthImoge from "../../assets/images/Login/earthSymbol.svg";
import KakaoLogin from "../../assets/images/Login/kakaoLogin.svg";
import Speaker from "../../assets/images/Login/loudspeaker.svg";
import Chat from "../../assets/images/Login/ChatImoge.svg";
import Goorm from "../../assets/images/Login/TitleGoorm.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 110px);
  width: 100%;
  /* height: 100%; */
  border: 1px solid red;
  /* overflow: scroll; */
`;

export const TopLogoWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  justify-content: flex-end;
  margin-right: 20px;
`;

export const TopLogoImg = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Bg = styled.div`
  display: flex;
  width: 390px;
  height: 1020px;
  background-color: #fdfcfb;
  border: 1px solid blue;
`;
// background-color: #FDFCFB 0;
export const BookContainer = styled.div`
  display: flex;
  /* position: absolute; */
  /* top: 8.5rem; */
  /* left: 0.9rem; */
  /* width: 22.5rem; */
  /* height: 35rem; */
  border-radius: 4px;
  width: 100%;
  margin-top: 30px;
  justify-content: center;

  /* background-color: #beeafc; */
  /* box-shadow: 8px 4px 4px 0px rgba(0, 0, 0, 0.5); */
  /* border: 1px solid red; */
`;

export const BookImg = styled.img`
  /* width: 70%; */
  width: 20rem;
`;

export const Title = styled.div`
  display: flex;
  /* position: absolute; */
  /* top: 2.625rem; */
  /* right: 1rem; */
  color: #191919;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const Titletext = styled.div`
  /* display: block; */
  /* position: absolute; */
  /* top: 4.875rem; */
  /* right: 1rem; */
  color: #001c30;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  justify-content: flex-end;
`;

export const TitleGoorm = styled.div`
  /* position: absolute; */
  /* top: 2.625rem; */
  /* right: 8rem; */
  width: 40px;
  height: 32.239px;
  background-image: url(${Goorm});
  display: flex;
  position: relative;
  justify-content: flex-end;
  margin-right: 10px;
`;

export const Earth = styled.div`
  position: absolute;
  top: 7.31rem;
  left: 3.75rem;
  width: 15.625rem;
  height: 15.625rem;
  background-image: url(${EarthImoge});
  background-repeat: no-repeat;
`;

export const KakaoLoginContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  top: -4.5rem;
  left: -0.4rem;
`;

export const Kakao = styled.img`
  /* position: absolute; */
  /* top: 28.5rem; */
  /* left: 1.8rem; */
  /* width: 18.75rem;
  height: 2.575rem;
  background-image: url(${KakaoLogin});
  background-repeat: no-repeat; */
  width: 60%;
`;

export const LoginBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -2rem;
  position: relative;
`;

export const LoginBottomImg = styled.img`
  width: 70%;
`;

export const LoudSpeaker = styled.div`
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  top: 45rem;
  left: 1.18rem;
  background-image: url(${Speaker});
  background-repeat: no-repeat;
`;

export const ChatBox = styled.div`
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  top: 51.5rem;
  right: 1.18rem;
  background-image: url(${Chat});
  background-repeat: no-repeat;
`;

export const Chatting = styled.div`
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
export const ChattingText = styled.div`
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
export const Normal = styled.div`
  display: flex;
  color: #0d0c00;
`;

export const Bold = styled.div`
  display: flex;
  color: #001c30;
`;
