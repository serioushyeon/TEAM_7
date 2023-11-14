import React from 'react';
import { Route, Routes} from "react-router-dom";
import TestPage from './pages/TestPage';
import Navigation from "./components/Navigation/NavBar";
import EmptyEvent from './pages/EmptyEvent/EmptyEvent';
import EventSetting from './pages/EventSetting/EventSetting';
import EventDisplay  from './pages/EventDisplay/EventDisplay';
import MoodCloud from './pages/MoodCloud/MoodCloud';
import BarcodeBoard from './pages/BarcodeBoard/BarcodeBoard';
// 여기서 경로 설정해주세요.
function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
  }
  setScreenSize();
  window.addEventListener('resize', () => setScreenSize());

  return (
    <>
    <Navigation />
        <Routes>
        <Route path="/" element={<TestPage />}></Route>
        {/* <EmptyEvent /> */}
        <Route path="/event" element={<EmptyEvent />} />
        {/*<EventSetting>*/}
        <Route path="/eventsetting" element={<EventSetting />} />
        {/* <EventDisplay /> */}
        <Route path="/eventdisplay" element={<EventDisplay />} />
        {/* <MoodCloud /> */}
        <Route path="/bcstore" element={<MoodCloud />} />
        {/* <BarcodeBoard /> */}
        <Route path="/ticket" element={<BarcodeBoard />} />
        </Routes>
    </>
  )
}

export default App
