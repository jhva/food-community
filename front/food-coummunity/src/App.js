import api from './api/api';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import LoginComplete from './LoginComplete';
import Kakao from './components/kakao/Kakao';
import React, { useState } from 'react';
import Test from 'Test';
import Main from 'pages/Main';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/test' element={<Test />} />

        <Route path='/auth/kakao/callback' element={<Kakao />} />
      </Routes>
    </Router>
  );
}

export default App;
