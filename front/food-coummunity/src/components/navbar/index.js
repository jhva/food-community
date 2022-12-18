import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Login from 'components/modal/Login';
import SignUp from 'components/modal/SignUp';

const NavBar = ({ isGeolocation }) => {
  const user = false;
  const navigate = useNavigate();

  const [isLoginOpenModal, setIsLoginOpenModal] = useState(false);
  const [isSignUpOpenModal, setIsSignUpOpenModal] = useState(false);

  const handleNavigate = (type) => {
    switch (type) {
      case '채팅':
        navigate('/chat');
        break;
      case '로그인':

      default:
        break;
    }
  };
  return (
    <NavBarContainer>
      <Container>
        <div>
          <b>같이먹으러가요</b>
        </div>
        <RightContainer>
          <p
            onClick={() => {
              handleNavigate('채팅');
            }}
          >
            채팅{' '}
          </p>
          <p>게시판</p>
          <p
            onClick={() => {
              setIsLoginOpenModal(true);
            }}
          >
            로그인
          </p>
          {isLoginOpenModal ? (
            <Login
              setIsSignUpOpenModal={setIsSignUpOpenModal}
              setIsLoginOpenModal={setIsLoginOpenModal}
            />
          ) : null}
          {isSignUpOpenModal ? (
            <SignUp
              setIsLoginOpenModal={setIsLoginOpenModal}
              setIsSignUpOpenModal={setIsSignUpOpenModal}
            />
          ) : null}

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
  p {
    cursor: pointer;
    margin: 0px 10px;
  }

  display: flex;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0px 10px;
`;
