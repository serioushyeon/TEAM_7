import React, { useState } from 'react'
import { S } from './StartStyle';

export default function StartPage() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
  };

  return (
    <>
            <S.BookContainer className={isAnimating ? 'animate' : ''} onClick={handleClick}>
              <S.Earth className={isAnimating ? 'animate' : ''} />
              <S.Kakao className={isAnimating ? 'animate' : ''}>Click Me!</S.Kakao>
            </S.BookContainer>
            <S.LoudSpeaker className={isAnimating ? 'animate' : ''}/>
              <S.ChatBox className={isAnimating ? 'animate' : ''}/>
              </>
  )
}
