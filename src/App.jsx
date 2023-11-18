import { Route, Routes, useLocation } from "react-router-dom";
import TestPage from "./pages/TestPage";
import EmptyEvent from "./pages/EmptyEvent/EmptyEvent";
import EventSetting from "./pages/EventSetting/EventSetting";
import EventDisplay from "./pages/EventDisplay/EventDisplay";
import MoodCloud from "./pages/MoodCloud/MoodCloud";
import BarcodeBoard from "./pages/BarcodeBoard/BarcodeBoard";
import React from "react";
import { styled } from "styled-components";
import Login from "./pages/Login/Login";
import NavBar from "./components/Navigation/NavBar";
import EventPhoto from "./pages/Eventphoto/EventPhoto";
import SubStart from "./pages/start/SubStart";
import Passport from "./pages/userInfo/Passport";
import MyCalendar from "./pages/calendar/Calendar";
import CalendarPhoto from "./pages/calendarPhoto/CalendarPhoto";
import CCalendarGallery from "./pages/calendarPhoto/CalendarGallery";
import { useCookies } from "react-cookie";

const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  /* background-color: black; */
  position: relative;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 390px;
  /* border: 1px solid blue; */
  position: relative;
  height: 100%;
  background-color: #faf6f4;
`;

// 여기서 경로 설정해주세요.
function App() {
  const location = useLocation();
  const [accessCookie] = useCookies(["accessCookie"]);
  const [refreshCookie] = useCookies(["refreshCookie"]);

  const getAccessCookie = localStorage.getItem("accessCookie");
  const getRefreshCookie = localStorage.getItem("refreshCookie");

  console.log(getAccessCookie);

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
  }
  setScreenSize();
  window.addEventListener("resize", () => setScreenSize());

  const showNavBar = () => {
    const hideOnRoutes = ["/"]; // NavBar를 숨길 경로 목록
    return !hideOnRoutes.includes(location.pathname);
  };

  return (
    <>
      <Background>
        <Wrapper>
          {showNavBar() && <NavBar />}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/substart" element={<Passport />} />
            <Route path="/calendar" element={<MyCalendar />} />
            <Route path="/calendar-photo/:date" element={<CalendarPhoto />} />
            <Route
              path="/calendar-non-photo/:date"
              element={<CCalendarGallery />}
            />
            <Route path="/test" element={<TestPage />} />
            <Route path="/eventphoto/:eventId" element={<EventPhoto />} />
            {/* <EmptyEvent /> */}
            <Route path="/event" element={<EmptyEvent />} />
            {/*<EventSetting>*/}
            <Route path="/eventsetting" element={<EventSetting />} />
            <Route path="/eventsetting/edit" element={<EventSetting />} />
            {/* <EventDisplay /> */}
            <Route path="/eventdisplay" element={<EventDisplay />} />
            <Route path="/eventdisplay/:id" element={<EventDisplay />} />
            {/* <MoodCloud /> */}
            <Route path="/bcstore" element={<MoodCloud />} />
            {/* <BarcodeBoard /> */}
            <Route path="/ticket" element={<BarcodeBoard />} />
            <Route path="/ticket/:id" element={<BarcodeBoard />} />
            <Route path="/ticket/:id/guest" element={<BarcodeBoard />} />
          </Routes>
        </Wrapper>
      </Background>
    </>
  );
}

export default App;
