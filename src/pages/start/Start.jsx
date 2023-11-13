import HTMLFlipBook from "react-pageflip";
import React from 'react'
import { S } from './Style';
import StartPage from '../../components/startpage/StartPage'

// ref 없으면 페이지 전환이 불가함.
// PageContainer에서 위치 지정하면 적용이 안됨. 
const Page = React.forwardRef(({ image }, ref) => {
    return (
      <div ref={ref}>
       {image === "0" && (
        <S.FirstPage />
      )}
      {image === "1" && (
        <StartPage />
      )}
      {image === "2" && (
        <></>
        // 여권 위 페이지
      )}
      {image === "3" && (
        <></>
        // 여권 아래 페이지
      )}
      </div>
    );
  });

export default function Start() {
  return (
    <S.Container>
    <S.Bg />
    <S.Title><S.MoodTitle>MOOD</S.MoodTitle>BARCORD</S.Title>
    <S.Titletext>당신의 일상을 특별하게 <S.MoodText>표현</S.MoodText>하세요</S.Titletext>
      <HTMLFlipBook width={200} height={300}>
      <Page image="0" />
      <Page image="1" />
      <Page image="2" />
      <Page image="3" />
    </HTMLFlipBook>
    </S.Container>
  )
}
