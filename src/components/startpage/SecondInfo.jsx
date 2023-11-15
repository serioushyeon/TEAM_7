import React from 'react'
import SecondInfo from '../useinfo/SecondInfo'
import styled from 'styled-components'

const Container = styled.div`
position: absolute;
transform: rotate(-90deg);
width: 360px;
height: 360px;
top: 15px;
left: -450px;
`

export default function SecondInfoFlip() {
  return (
    <Container>
        <SecondInfo />
    </Container>
  )
}
