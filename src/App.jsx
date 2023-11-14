import React from "react";
import { styled } from "styled-components";
import { Route, Routes } from "react-router-dom";
import TestPage from "./pages/TestPage";
import Login from "./pages/Login/Login";
import NavBar from "./components/Navigation/NavBar";
import EventPhoto from "./pages/Eventphoto/EventPhoto";
import SubStart from "./pages/start/SubStart";
import Start from "./pages/start/Start";
import Passport from "./pages/userInfo/Passport";
import MyCalendar from "./pages/calendar/Calendar";
import CalendarPhoto from "./pages/calendarPhoto/CalendarPhoto";

const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: black;
  position: relative;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 390px;
  border: 1px solid blue;
  position: relative;
  height: 100%;
  background-color: #faf6f4;
`;

// 여기서 경로 설정해주세요.
function App() {
  return (
    <>
      <Background>
        <Wrapper>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/substart" element={<SubStart />} />
            <Route path="/start" element={<Start />} />
            <Route path="/userinfo" element={<Passport />} />
            <Route path="/calendar" element={<MyCalendar />} />
            <Route path="/calendarPhoto" element={<CalendarPhoto />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/eventphoto" element={<EventPhoto />} />
          </Routes>
        </Wrapper>
      </Background>
    </>
  );
}

export default App;
