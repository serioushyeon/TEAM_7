import HTMLFlipBook from "react-pageflip";
import React, { useRef, useState } from 'react'
import { S } from './Style';
import { useNavigate } from "react-router-dom";
import StartFlipPage from "../../components/startpage/StartFlipPage";
import FirstInfoFlip from "../../components/startpage/FirstInfoFlip";
import SecondInfoFlip from "../../components/startpage/SecondInfo";
import { useCookies } from "react-cookie";

  // ref 없으면 페이지 전환이 불가함.
// PageContainer에서 위치 지정하면 적용이 안됨. 

const StartPageFlip = React.forwardRef((props, ref) => {
  const { onClick } = props;

  return (
    <div className="demoPage" ref={ref} onClick={onClick}> 
    <StartFlipPage />
    </div>
  );
});

const FirstFlip = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}> 
      <FirstInfoFlip />
    </div>
  );
});

const SecondFlip = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}> 
      <SecondInfoFlip />
    </div>
  );
});


export default function Start() {
  const navigate = useNavigate();
  const [disableFlip, setDisableFlip] = useState(false);

  const [accessCookie] = useCookies(["accessCookie"]);
    const [refreshCookie] = useCookies(["refreshCookie"]);

    const getAccessCookie = localStorage.getItem("accessCookie");
   const getRefreshCookie = localStorage.getItem("refreshCookie");

  // 페이지 플립 컴포넌트에 대한 ref 생성 및 초기화
  const pageFlipRef = useRef(null);

  // 다음 페이지로 넘기는 함수
  const goToNextPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.pageFlip().flipNext('bottom'); //top도 가능

      setTimeout(() => {
        console.log('Navigating to /userinfo'); // 디버깅을 위한 콘솔 로그
        navigate('/userinfo');
      }, 700);

      setTimeout(() => {
        {getAccessCookie &&
          getAccessCookie !== "undefined" && 
          getAccessCookie !== undefined && (
            alert("환영합니다 ! 유저정보를 입력해주세요. ")
          )
        }
      }, 1000);
    }
  };

  const handlePageTwoClick = () => {
    console.log('Page two clicked'); // 디버깅을 위한 콘솔 로그
    setDisableFlip(true);
  };

  return (
    <S.Container>
    <S.Bg />
    <S.TitleGoorm />
        <S.Title>MOOCO</S.Title>
        <S.Titletext>무드를 표현하는 새로운 방법, 무코</S.Titletext>
    <S.Introduce />
      <HTMLFlipBook 
      ref={pageFlipRef}
      className="rotate90"
      width={360} 
      height={360}
      usePortrait={false}
      drawShadow={true}
      style={{
        position: 'absolute',
       transform: 'rotate(90deg)',
        width: '15rem',
        height: '22.5rem',
        top: '15.375rem',
        left: '-10.2rem'
      }}>
        <div className="demoPage"number="1"> </div>
      <StartPageFlip number="2" onClick={handlePageTwoClick}>1</StartPageFlip>
      <FirstFlip number="3">2</FirstFlip>
      <SecondFlip number="4">3</SecondFlip>
    </HTMLFlipBook>
    <S.FlipButton onClick={goToNextPage}>Click Me</S.FlipButton>
    </S.Container>
  )
}
