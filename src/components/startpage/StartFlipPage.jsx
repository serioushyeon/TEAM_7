import React from 'react'
import styled from 'styled-components';
import { S } from './StartStyle';
import EarthImoge from '../../assets/images/Login/earthSymbol.svg';

const BookContainer = styled.div`
display: flex;
position: absolute;
height: 22.5rem; 
width: 15rem;
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
scale : 0.666667;
top: 1.3rem; 
left: -0.5rem;
transform: rotate(90deg);
background-repeat: no-repeat;
background-size: cover; 
background-position: center; 
background-image: url(${EarthImoge});
background-repeat: no-repeat;
`

const AnimateButton = styled.div`
position: absolute;
top: 0rem;
left: 0rem;
width: 15rem;
height: 22.5rem;
text-align: center;
align-items: center;
justify-contents: center;
box-shadow: 2px 2px rgba(255, 255, 255, 0.5); 
`

export default function StartFlipPage() {
  return (
    <BookContainer >
              <Earth />
              <AnimateButton>Click Me!</AnimateButton>
            </BookContainer>
  )
}
