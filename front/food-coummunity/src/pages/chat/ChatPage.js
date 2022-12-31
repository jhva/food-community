import api from 'api/api';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

let interval = 3000;
const ChatPage = () => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const routingNavigate = (id, data) => {
    navigate(`/chatroom/${id}`, {
      state: { data },
    });
  };

  const onSocket = () => {
    const socket = io('http://localhost:9000', {
      transports: ['websocket'],
    });

    setInterval(() => {
      socket.emit('good', '클라이언트 -> 서버');
    }, interval);

    socket.on('hi', (data) => console.log(data)); // 서버 -> 클라이언트
  };
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzNDQiLCJuaWNrbmFtZSI6IjIxMTI9MjMzNTQiLCJpZCI6NCwiaWF0IjoxNjcyNTAxMDEzLCJleHAiOjE2NzI1MDQ2MTMsImlzcyI6ImtqaCJ9.8lDgshPZQOo4E8EPoxrvq18gYSxkUST8rxDSOV7UlJI';
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
  console.log(chatList);
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
