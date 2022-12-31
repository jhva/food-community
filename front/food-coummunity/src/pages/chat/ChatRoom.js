import api from 'api/api';
import { onKeyPress } from 'constants/geolcation';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const ChatRoom = () => {
  const params = useParams();
  const location = useLocation();
  const [msgList, setMsgList] = useState([]);
  const [isValue, setIsValue] = useState(false);
  const [socketData, setSocketData] = useState([]);
  const [value, setValue] = useState({
    msg: '',
  });
  const socket = io('http://localhost:9000', {
    transports: ['websocket'],
  });
  const onSocket = () => {
    socket.on('sendMsg', (data) => setSocketData(data)); // 서버 -> 클라이언트
  };
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxIiwibmlja25hbWUiOiIyMTIzNTQiLCJpZCI6MSwiaWF0IjoxNjcyNTA5NjEwLCJleHAiOjE2NzI1NDU2MTAsImlzcyI6ImtqaCJ9.AIFzHSIaIPZ2pl6wI3Ho7si - Nie74tuMIa168Q24yYg';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzNDQiLCJuaWNrbmFtZSI6IjIxMTI9MjMzNTQiLCJpZCI6NCwiaWF0IjoxNjcyNTAzMTM1LCJleHAiOjE2NzI1MzkxMzUsImlzcyI6ImtqaCJ9.myY4rA3tRMBuBi84VfCYViFQ6pnGUI22hOjOIPU8yEc';
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
      socket.emit('msg', {
        data: body,
      });
      setValue({ ...value, msg: '' });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    socket.on('reply', function (data) {
      console.log(data, '!23');

      // 서버에게 메세지 송신
    });
    getChatMsg();
  }, []);
  return (
    <div>
      {msgList?.map((data, key) => (
        <p key={key}>{data.msg}</p>
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
