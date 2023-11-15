// Styles.js
import styled from 'styled-components';

export const Background = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 100vw;
height: 100vh;
background: #ffffffb7;
z-index: 999;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
max-width: 390px;
`;

export const LoadingText = styled.div`
font: 1rem 'Noto Sans KR';
text-align: center;
`;