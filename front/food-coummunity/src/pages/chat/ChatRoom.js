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
    query: { roomId: params.id },
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
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
      console.log(res);
      socket.emit('join room', {
        name: user.username,
        msg: value.msg,
        roomId: params.id,
      });
      setValue({ ...value, msg: '' });
    } catch (e) {
      console.log(e);
    }
  };
  const getChatMsg = async () => {
    try {
      const res = await api.get(`/chat/rooms/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      setSocketMsg(socketMsg.concat(res.data.data));
      // setMsgList(res.data.data);
      // socket.on('sendMsg', (data) => {
      //   // setSocketMsg((prev) => {}
      //   // setMsgList(data);
      //   // console.log(data);
      // });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChatMsg();

    socket.on('chatmsg', (item) => {
      setSocketMsg((prev) => {
        let newMsg = [item, ...prev];
        return newMsg;
      });
    });
    return () => {
      socket.off();
    };
  }, []);

  return (
    <div>
      {socketMsg?.map((data, key) => (
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
