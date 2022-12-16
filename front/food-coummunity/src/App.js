import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Kakao from './components/kakao/Kakao';
import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './utils';
import S from './utils/styles';
import styled from 'styled-components';
import Main from 'pages/main';
import theme from 'theme';
import NavBar from 'components/navbar';
import ChatPage from 'pages/chat/ChatPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <S.RootStyle>
        <Router>
          <Routes>
            <Route path='/' element={<Main />} />
            {/* <Route path='/test' element={<Test />} /> */}
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/auth/kakao/callback' element={<Kakao />} />
          </Routes>
        </Router>
      </S.RootStyle>
    </ThemeProvider>
  );
}

export default App;
