import React from 'react';
import { Route, Routes} from "react-router-dom";
import TestPage from './pages/TestPage';
import Login from './pages/Login/Login';
import NavBar from './components/Navigation/NavBar';

// 여기서 경로 설정해주세요.
function App() {

  return (
    <>
    <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
        <Route path="/test" element={<TestPage />} />
        </Routes>
        </>
  )
}

export default App
