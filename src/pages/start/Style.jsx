import styled from 'styled-components';

const FlipContainer = styled.div`
transform: rotate(90deg);
width: 100%;
margin-top: 170px;
`

const FirstPage = styled.div`
display: flex;
position: absolute;
top: 8.5rem;
left: 0.9rem;
width: 22.5rem;
height: 35rem;
border-radius: 4px;
background-color: red;
`

const Container = styled.div`
position: relative;
display: flex;
align-items: center;
margin: 0 auto;
max-width: 390px;
max-height: 1080px;
width: 100%;
`

const Bg = styled.div`
display: flex;
width: 390px;
height: 1080px;
background-color: red;
`

const Title = styled.div`
display: flex;
position: absolute;
top: 2.625rem;
left: 5.2rem;
color: #191919;
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const MoodTitle = styled.div`
color : #DE684F;
margin-right: 0.3rem;
`


const Titletext = styled.div`
display: flex;
position: absolute;
top: 5.875rem;
left: 11.35rem;
color: #191919;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const MoodText = styled.div`
color : #DE684F;
margin-left: 0.3rem;
`


export const S = {
    FlipContainer,
    FirstPage,
    Container,
    Bg,
    Title,
    MoodTitle,
    Titletext,
    MoodText
}