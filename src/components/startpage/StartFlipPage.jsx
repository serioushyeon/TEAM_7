import React from 'react'
import styled from 'styled-components';
import StartFlip from '../../assets/images/userinfo/startFlip.svg';

const BookContainer = styled.div`
display: flex;
position: absolute;
width: 360px;
height: 360px;
background-image: url(${StartFlip});
background-repeat: no-repeat;
box-shadow: 8px 4px 4px 0px rgba(0, 0, 0, 0.50);
`

export default function StartFlipPage() {
  return (
    <BookContainer />
  )
}
