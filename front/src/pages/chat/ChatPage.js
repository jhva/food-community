import api from 'api/api';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { Box, Container, TopContainerStyle } from './chatPageStyle';
import { COLOR, COLORNAME } from 'constants/color';
import { CustomMdOutlineArrowBackIosNew } from 'components/button';
import TopBar from 'components/TopBar';

const ChatPage = () => {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);

  const socket = io('http://localhost:9000', {
    transports: ['websocket'],
  });

  const routingNavigate = (id, data) => {
    navigate(`/chatroom/${id}`, {
      state: { data },
    });
  };

  const chatRoomGet = async () => {
    try {
      const res = await api.get(`/chat/rooms`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      // console.log(res);
      setChatList(res.data.data);
    } catch (e) {
      console.log(e?.response?.data);
    }
  };
  useEffect(() => {
    chatRoomGet();
  }, []);
  return (
    <div>
      <TopBar text={'채팅'} />

      {chatList.map((item, index) => (
        <Container key={index}>
          <Box
            onClick={() => {
              socket.emit('join room', item);
              routingNavigate(item.id, item);
            }}
            INDEX={index}
            COLORNAME={COLORNAME}
            COLOR={COLOR}
          >
            <p>{item.title}</p>

            <p>{item.content}</p>
          </Box>
        </Container>
      ))}
    </div>
  );
};

export default ChatPage;
