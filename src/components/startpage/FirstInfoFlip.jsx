import React from 'react'
import FirstInfo from '../useinfo/FirstInfo'
import styled from 'styled-components'

const Container = styled.div`
position: absolute;
transform: rotate(-90deg);
width: 360px;
height: 360px;
top: 15px;
right: 100px;
`

export default function FirstInfoFlip() {
  return (
    <Container>
        <FirstInfo />
    </Container>
  )
}
