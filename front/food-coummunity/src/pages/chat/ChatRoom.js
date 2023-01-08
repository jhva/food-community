import { height } from '@mui/system';
import api from 'api/api';
import { onKeyPress } from 'constants/geolcation';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  ChatConatiner,
  ChatFooter,
  ChatContainerText,
  ChatRootContainer,
  ChatContainer,
  Msg,
  ChatMsg,
  SubmintButton,
  ChatTextBox,
  TopBox,
  TopText,
} from './chatRoomStyle';

const ChatRoom = () => {
  const { token, user } = useSelector((state) => state.auth);
  const ref = useRef();

  const navigater = useNavigate();
  const location = useLocation();
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
        nickname: user?.nickname,
        userId: user?.id,
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
      // console.log(res);
      setSocketMsg(socketMsg.concat(res?.data?.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!params.id) {
      return navigater(-1);
    }

    // 현재 스크롤 위치 === scrollRef.current.scrollTop
    // 스크롤 길이 === scrollRef.current.scrollHeight

    getChatMsg();

    socket.on('chatmsg', (item) => {
      setSocketMsg((prev) => {
        let newData = Object.assign([], prev);
        newData.push(item);
        return newData;
      });
    });

    return () => {
      socket.off();
    };
  }, []);
  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [socketMsg]);

  return (
    <>
      <TopBox>
        <TopText>{location?.state?.data?.title}</TopText>
      </TopBox>

      <ChatRootContainer>
        <ChatConatiner ref={ref}>
          {socketMsg?.map((data, key) => {
            return (
              <ChatTextBox key={key}>
                <ChatContainerText>
                  <Msg
                    hasUser={
                      !data?.User?.nickname
                        ? data?.userId === user?.id
                        : data?.User.id === user?.id
                    }
                  >
                    <p style={{ fontWeight: 'bold' }}>
                      {!data?.User?.nickname
                        ? data.nickname
                        : data?.User?.nickname}
                    </p>
                    <p> {data?.msg}</p>
                  </Msg>
                </ChatContainerText>
              </ChatTextBox>
            );
          })}
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
            <SubmintButton
              form='footer-btn'
              type='submit'
              onClick={() => {
                sendMsg();
              }}
              disabled={!value.msg}
            >
              보내기
            </SubmintButton>
          </ChatFooter>
        </form>
      </ChatRootContainer>
    </>
  );
};

export default ChatRoom;
