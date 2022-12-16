import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; // Client Socket

const ChatPage = () => {
  const [value, setValue] = useState('');
  const [msg, setMsg] = useState([]);
  const socket = io('http://localhost:9000', {
    cors: {
      origin: '*',
    },
  });
  const [room, setRoom] = useState('');

  const JoinRoom = (e) => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };
  useEffect(() => {
    socket.on('send_message', (data) => {
      console.log(data);
      setMsg(data.message);
    });
  }, [socket]);
  const sendMessage = () => {
    socket.emit('send_message', { message: value });
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      test socket connection
      <button onClick={sendMessage}>Request</button>
      <input value={value} type='text' onChange={handleChange} />
      <div>
        <input
          type='text'
          placeholder='Room Number,,,'
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={JoinRoom}>Join Room</button>
      </div>
      <div>메세지리스트</div>
      {console.log(msg)}
      {msg}
      {/* {msg?.map((item, index) => (
        <div key={index}>
          <p>{item?.message}</p>
          <p>{item?.id}</p>
        </div>
      ))} */}
    </div>
  );
};

export default ChatPage;
