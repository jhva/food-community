import { Box, TextField } from '@mui/material';
import { BasicButton, CustomCancelMdCancel } from 'components/button';
import CustomTextField from 'components/inputs/CustomTextField';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ModalBackdrop } from './commonStyle';
import kakaoImg from 'assets/kakaologin.png';

const Login = ({ setIsLoginOpenModal, setIsSignUpOpenModal }) => {
  const handleClosingModal = useCallback((type) => {
    if (type == '닫기') {
      setIsLoginOpenModal(false);
    }
    setIsLoginOpenModal(false);
  }, []);

  return (
    <ModalBackdrop onClick={handleClosingModal}>
      <BoxContainer onClick={(e) => e.stopPropagation()}>
        <LoginForm
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TopBar>
            <CustomCancelMdCancel
              onClick={() => {
                handleClosingModal('닫기');
              }}
            >
              닫기아이콘
            </CustomCancelMdCancel>
          </TopBar>
          <TitleBox>{'같이먹으러가요 \n로그인'}</TitleBox>
          <TextFieldStyle>
            <CustomTextField
              style={InputStyle}
              type='text'
              label={'이메일'}
              variant='outlined'
            />
            <CustomTextField
              style={InputStyle}
              type='password'
              label={'비밀번호'}
              variant='outlined'
            />
          </TextFieldStyle>
          <div style={{ flex: 1 }}>
            <BasicButton text={'로그인'} />
            <div style={{ marginTop: '10px' }}>
              <BasicButton
                onClick={() => {
                  setIsSignUpOpenModal(true);
                  setIsLoginOpenModal(false);
                }}
                text={'회원가입'}
              />
            </div>
            <Img src={kakaoImg} />
          </div>
        </LoginForm>
      </BoxContainer>
    </ModalBackdrop>
  );
};

export default Login;
const Img = styled.img`
  width: 100%;
  margin: 10px 0px;
  cursor: pointer;
`;
const InputStyle = {
  width: '100%',
  marginBottom: '10px',
};

const LoginForm = styled.form``;
const TextFieldStyle = styled.div`
  margin-bottom: 50px;
`;

const BoxContainer = styled.div`
  width: 500px;
  height: 667px;
  padding: 20px;
  background-color: white;
`;
const TopBar = styled.div`
  display: flex;
  justify-content: right;
`;

const TitleBox = styled.div`
  text-align: center;
  margin: 10px 0px;
  white-space: pre-wrap;
`;
