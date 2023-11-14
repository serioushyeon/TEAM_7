import styled from 'styled-components';

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

const BookBg = styled.div`
display: flex;
margin-top: 10.5rem;
width: 390px;
height: 34.5rem;
background-color: white;
`
// background-color: #FDFCFB 0;


export const S = {
    Container,
    Bg,
    BookBg
}