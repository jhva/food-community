import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Login from 'components/modal/Login';
import SignUp from 'components/modal/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { localLogout } from 'redux/userReducer';
import Alarm from 'components/modal/Alarm';
import { io } from 'socket.io-client';

const NavBar = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoginOpenModal, setIsLoginOpenModal] = useState(false);
  const [isSignUpOpenModal, setIsSignUpOpenModal] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);
  const [kakaoValue, setKakaoValue] = useState({
    isSign: '',
    type: '',
    oauthId: '',
  });
  const { token, user } = useSelector((state) => state?.auth);

  const handleNavigate = (type) => {
    switch (type) {
      case '채팅':
        if (!user) {
          return alert('로그인 후 이용해주세요');
        }
        navigate('/chat');
        break;
      case '로그인':
        break;
      case '게시판':
        if (!user) {
          return alert('로그인 후 이용해주세요');
        }
        navigate('/board');
        break;

      case '알림':
        if (!user) {
          return alert('로그인 후 이용해주세요');
        }
        break;
      default:
        break;
    }
  };
  return (
    <NavBarContainer>
      <Container>
        <div>
          {user ? (
            <b>안녕하세요 {user?.nickname}님! </b>
          ) : (
            <b>같이먹으러가요</b>
          )}
        </div>
        <RightContainer>
          {/* <Text
            onClick={() => {
              if (!user) {
                alert('로그인 후 이용해주세요');
                return;
              }
              setIsAlarm(true);
            }}
          >
            알림
          </Text> */}
          <Text
            onClick={() => {
              handleNavigate('채팅');
            }}
          >
            채팅
          </Text>
          <Text
            onClick={() => {
              handleNavigate('게시판');
            }}
          >
            게시판
          </Text>
          {!user ? (
            <Text
              onClick={() => {
                setIsLoginOpenModal(true);
              }}
            >
              로그인
            </Text>
          ) : (
            <Text
              onClick={() => {
                if (window.confirm('정말 로그아웃 하시겠습니까 ?')) {
                  dispatch(localLogout(token));
                }
                return;
              }}
            >
              로그아웃
            </Text>
          )}
          {isLoginOpenModal ? (
            <Login
              kakaoValue={kakaoValue}
              setKakaoValue={setKakaoValue}
              setIsSignUpOpenModal={setIsSignUpOpenModal}
              setIsLoginOpenModal={setIsLoginOpenModal}
            />
          ) : null}
          {isSignUpOpenModal ? (
            <SignUp
              kakaoValue={kakaoValue}
              setKakaoValue={setKakaoValue}
              setIsLoginOpenModal={setIsLoginOpenModal}
              setIsSignUpOpenModal={setIsSignUpOpenModal}
            />
          ) : null}
          {/* {isAlarm ? <Alarm setIsAlarm={setIsAlarm} /> : null} */}

          {/* {user && <p>마이페이지 </p>} */}
        </RightContainer>
      </Container>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
`;
const Text = styled.p`
  margin: 0px 10px;
  cursor: ${(props) =>
    props.mylocation === false ? 'not-allowed' : 'pointer'};
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0px 10px;
`;
