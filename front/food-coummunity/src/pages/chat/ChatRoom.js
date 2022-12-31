import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const ChatRoom = () => {
  const params = useParams();
  console.log(params);
  const location = useLocation();
  console.log(location.state);
  useEffect(() => {}, []);

  return <div>chatRoom</div>;
};

export default ChatRoom;
