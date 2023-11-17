import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

import Home from "../../assets/images/Navigation/homeImoge.svg";
import Calendar from "../../assets/images/Navigation/calendarImoge.svg";
import Event from "../../assets/images/Navigation/eventImoge.svg";
import Barcord from "../../assets/images/Navigation/barcodeImoge.svg";

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 0 auto;
max-width: 100vw;
max-height: 844px;
` 

const Navigation = styled.div`
position: fixed;
background: var(--PrimaryLightVer, #FAFAFA);
bottom: 0;
display: flex;
width: 100%;
max-width: 390px;
height: 100px;
justify-content:center;
align-items: center;
z-index: 500;
`

const NavigationButton = styled(Link)`
width: 25%;
font-size : 14px;
text-align: center;

color: black;
text-decoration: none;
&:visited {
  color: black;
}
`

const ButtonImoge = styled.img`
margin: 0 2rem 0 2rem;
width: 24px;
height: 24px;
background-repeat: no-repeat;
`

const ButtonText = styled.div`
margin-top: 0.3rem;
color: #000;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`
export default function NavBar() {

  const [cookies] = useCookies(["accessCookie", "refreshCookie"]);

  // 쿠키 존재 여부에 따라 경로 설정
  const homePath = (cookies.accessCookie || cookies.refreshCookie != undefined) || (cookies.accessCookie || cookies.refreshCookie != null) ? "/substart" : "/";
  console.log('cookie: ', cookies.accessCookie);

  return (
    <Container>
      <Navigation>
<NavigationButton to = {homePath}><ButtonImoge src={Home}/><ButtonText>홈</ButtonText></NavigationButton>
<NavigationButton to = "/calendar"><ButtonImoge src={Calendar}/><ButtonText>일상</ButtonText></NavigationButton>
<NavigationButton to = "/event"><ButtonImoge src={Event}/><ButtonText>이벤트</ButtonText></NavigationButton>
<NavigationButton to = "/bcstore"><ButtonImoge src={Barcord}/><ButtonText>무코 보관함</ButtonText></NavigationButton>
</Navigation>
    </Container>
  )
}
