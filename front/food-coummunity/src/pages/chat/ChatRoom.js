import api from 'api/api';
import { onKeyPress } from 'constants/geolcation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  ChatConatiner,
  ChatFooter,
  ChatText,
  ChatRootContainer,
  ChatTextBox,
} from './chatPageStyle';

const ChatRoom = () => {
  const { token, user } = useSelector((state) => state.auth);
  const navigater = useNavigate();
  const params = useParams();
  const [socketMsg, setSocketMsg] = useState([]);
  const [value, setValue] = useState({
    msg: '',
  });
  const socket = io('http://localhost:9000', {
    transports: ['websocket'],
    query: { roomId: params.id },
  });

  const onhandleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const sendMsg = async () => {
    let body = {
      msg: value.msg,
      RecruitId: params.id,
    };
    if (value.msg.trim() === '') {
      return alert('띄워쓰기를 제거해주세요');
    }
    try {
      const res = await api.post(`/chat/msg`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
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
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!params.id) {
      return navigater(-1);
    }

    socket.on('chatmsg', (item) => {
      setSocketMsg((prev) => {
        let newMsg = [item, ...prev];
        return newMsg;
      });
    });
    getChatMsg();

    return () => {
      socket.off();
    };
  }, []);
  return (
    <ChatRootContainer>
      <ChatConatiner>
        {socketMsg?.map((data, key) => (
          <ChatTextBox hasUser={data?.UserId} USER={user.id}>
            <ChatText key={key}>{data?.msg}</ChatText>
          </ChatTextBox>
        ))}
      </ChatConatiner>

      <form
        id='footer-btn'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <ChatFooter>
          <input
            value={value.msg}
            name='msg'
            onChange={(e) => {
              onhandleChange(e);
              // setIsValue(true);
            }}
            onKeyPress={(e) => {
              onKeyPress(e);
            }}
          />
          <button
            form='footer-btn'
            type='submit'
            onClick={() => {
              sendMsg();
            }}
            disabled={!value.msg}
          >
            보내기
          </button>
        </ChatFooter>
      </form>
    </ChatRootContainer>
  );
};

export default ChatRoom;
