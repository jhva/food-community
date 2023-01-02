import api from 'api/api';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

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
      console.log(e?.response?.data);
    }
  };
  useEffect(() => {
    codeFunction();
  }, []);
  return (
    <div>
      {chatList.map((item, index) => (
        <p
          key={index}
          onClick={() => {
            socket.emit('join room', item);
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
