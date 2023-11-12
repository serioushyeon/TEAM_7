import React from 'react';
import { Route, Routes} from "react-router-dom";
import TestPage from './pages/TestPage';
import Navigation from "./components/Navigation/NavBar";

// 여기서 경로 설정해주세요.
function App() {

  return (
    <>
    <Navigation />
        <Routes>
        <Route path="/" element={<TestPage />}></Route>
        </Routes>
    </>
  )
}

export default App
