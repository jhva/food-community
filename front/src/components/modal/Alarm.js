import { CustomCancelMdCancel } from 'components/button';
import TopBar from 'components/TopBar';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { ModalBackdrop } from './commonStyle';

const Alarm = ({ setIsAlarm }) => {
  const { token, user } = useSelector((state) => state.auth);

  const handleClosingModal = useCallback((type) => {
    if (type == '닫기') {
      setIsAlarm(false);
    }
    setIsAlarm(false);
  }, []);

  return (
    <ModalBackdrop onClick={handleClosingModal}>
      <BoxContainer onClick={(e) => e.stopPropagation()}>
        <div
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          1
        </div>
      </BoxContainer>
    </ModalBackdrop>
  );
};

export default Alarm;
const LoginForm = styled.form``;
const BoxContainer = styled.div`
  width: 500px;
  height: 667px;
  padding: 20px;
  background-color: white;
`;
