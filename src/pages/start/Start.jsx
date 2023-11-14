import HTMLFlipBook from "react-pageflip";
import React, { useRef } from 'react'
import { S } from './Style';
import StartFlipPage from "../../components/startpage/StartFlipPage";
import FirstInfoFlip from "../../components/startpage/FirstInfoFlip";
import SecondInfoFlip from "../../components/startpage/SecondInfo";

  // ref 없으면 페이지 전환이 불가함.
// PageContainer에서 위치 지정하면 적용이 안됨. 

const StartPageFlip = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}> 
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
  // 페이지 플립 컴포넌트에 대한 ref 생성 및 초기화
  const pageFlipRef = useRef(null);

  // 다음 페이지로 넘기는 함수
  const goToNextPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.pageFlip().flipNext('bottom'); //top도 가능
    }
  };

  return (
    <S.Container>
    <S.Bg />
    <S.Title><S.MoodTitle>MOOD</S.MoodTitle>BARCORD</S.Title>
    <S.Titletext>당신의 일상을 특별하게 <S.MoodText>표현</S.MoodText>하세요</S.Titletext>
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
        top: '14.375rem',
        left: '-10.2rem'
      }}>
        <div className="demoPage"number="1"> </div>
      <StartPageFlip number="2">1</StartPageFlip>
      <FirstFlip number="3">2</FirstFlip>
      <SecondFlip number="4">3</SecondFlip>
    </HTMLFlipBook>
    <S.FlipButton onClick={goToNextPage}>Click Me</S.FlipButton>
    </S.Container>
  )
}
