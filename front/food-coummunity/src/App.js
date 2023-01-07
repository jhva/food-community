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
import ChatRoom from 'pages/chat/ChatRoom';
import { useDispatch, useSelector } from 'react-redux';
import { healthcheck } from 'redux/userReducer';
import Board from 'pages/board';
import BoardUpload from 'pages/board/BoardUpload';
import BoardDetail from './pages/board/BoardDetail';

function App() {
  const { token, user } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // useEffect(() => {}, [user]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <S.RootStyle>
        <Router>
          <Routes>
            <Route path='/' element={<Main />} />
            {/* <Route path='/test' element={<Test />} /> */}
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/chatroom' element={<ChatRoom />}>
              <Route path='/chatroom/:id' element={<ChatRoom />} />
            </Route>

            <Route path='/board' element={<Board />} />
            <Route path='/boardUpload' element={<BoardUpload />} />
            <Route path='/boardContent' element={<BoardUpload />}>
              <Route path=':id' element={<BoardDetail />} />
            </Route>

            <Route path='/auth/kakao/callback' element={<Kakao />} />
          </Routes>
        </Router>
      </S.RootStyle>
    </ThemeProvider>
  );
}

export default App;
