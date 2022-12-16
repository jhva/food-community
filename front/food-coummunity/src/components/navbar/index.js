import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const user = false;

  const navigate = useNavigate();

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
          <p>로그인</p>
          {user && <p>마이페이지 </p>}
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
