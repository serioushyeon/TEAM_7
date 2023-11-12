import React from 'react';
import { Route, Routes} from "react-router-dom";
import TestPage from './pages/TestPage';

// 여기서 경로 설정해주세요.
function App() {

  return (
        <Routes>
        <Route path="/" element={<TestPage />}></Route>
        </Routes>
  )
}

export default App
