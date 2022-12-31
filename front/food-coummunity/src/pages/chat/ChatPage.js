import api from 'api/api';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const ChatPage = () => {
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

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzNDQiLCJuaWNrbmFtZSI6IjIxMTI9MjMzNTQiLCJpZCI6NCwiaWF0IjoxNjcyNTAzMTM1LCJleHAiOjE2NzI1MzkxMzUsImlzcyI6ImtqaCJ9.myY4rA3tRMBuBi84VfCYViFQ6pnGUI22hOjOIPU8yEc';
  const codeFunction = async () => {
    try {
      const res = await api.get(`/chat/rooms`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      setChatList(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    codeFunction();
  }, []);
  return (
    <div>
      {chatList.map((item) => (
        <p
          onClick={() => {
            routingNavigate(item.id, item);
          }}
        >
          {item.title}
        </p>
      ))}
    </div>
  );
};

export default ChatPage;
