import styled from 'styled-components';
import Intro from '../../assets/images/Login/Introduce.svg';
import Goorm from '../../assets/images/Login/TitleGoorm.svg';

const FirstPage = styled.div`
display: flex;
position: absolute;
top: 8.5rem;
left: 0.9rem;
width: 22.5rem;
height: 35rem;
border-radius: 4px;
`

const Container = styled.div`

`

const Bg = styled.div`
`

const Title = styled.div`
display: flex;
position: absolute;
top: 2.625rem;
right: 1rem;
color: #191919;
font-size: 28px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const Titletext = styled.div`
display: block;
position: absolute;
top: 4.875rem;
right: 1rem;
color: #001C30;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
`

const TitleGoorm = styled.div`
position: absolute;
top: 2.625rem;
right: 8rem;
width: 40px;
height: 32.239px;
background-image: url(${Goorm});
`

const FlipButton = styled.div`
 // border: 1px solid #000;
position: absolute;
top: 10.2rem;
left: 1rem;
width: 22.5rem;
height: 20rem;
`

const Introduce = styled.div`
position: absolute;
top: 7rem;
left: -2.5rem;
width: 468px;
height: 390px;
background-image: url(${Intro});
opacity: 1;
scale: 0.9;
`


export const S = {
    FirstPage,
    Container,
    Bg,
    Title,
    Titletext,
    TitleGoorm,
    FlipButton,
    Introduce
}