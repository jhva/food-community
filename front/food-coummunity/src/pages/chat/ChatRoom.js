import api from 'api/api';
import { onKeyPress } from 'constants/geolcation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const ChatRoom = () => {
  const { token, user } = useSelector((state) => state.auth);

  const params = useParams();
  const location = useLocation();
  const [msgList, setMsgList] = useState([]);
  const [isValue, setIsValue] = useState(false);
  const [socketMsg, setSocketMsg] = useState([]);
  const [value, setValue] = useState({
    msg: '',
  });
  const socket = io('http://localhost:9000', {
    transports: ['websocket'],
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const getChatMsg = async () => {
    try {
      const res = await api.get(`/chat/rooms/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      setMsgList(res.data.data);
      socket.on('sendMsg', (data) => {
        console.log(data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const sendMsg = async () => {
    let body = {
      msg: value.msg,
      RecruitId: params.id,
    };

    if (value.msg.trim() === '') {
      return;
    }
    try {
      const res = await api.post(`/chat/msg`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      // socket.io(params.id).emit('createMessage', { data: body });

      socket.emit('chatmsg', {
        name: user.username,
        message: value.msg,
        roomId: params.id,
      });
      setValue({ ...value, msg: '' });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    socket.on('join room', (data, e) => {
      console.log(data);
    });
    socket.on('chatmsg', (item) => {
      console.log(item);
      // 클라이언트가 채팅 내용을 보냈을 시
    });

    // getChatMsg();
  }, [socketMsg, socket]);

  return (
    <div>
      {socketMsg.map((data, key) => (
        <p key={key}>{data.message}</p>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          value={value.msg}
          name='msg'
          onChange={(e) => {
            onChange(e);
            setIsValue(true);
          }}
          onKeyPress={(e) => {
            onKeyPress(e);
          }}
        />
        <button
          disabled={isValue === false ? true : false}
          onClick={() => {
            sendMsg();
          }}
        >
          버튼
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
