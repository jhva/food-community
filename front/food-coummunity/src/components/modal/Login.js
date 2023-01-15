import { Box, TextField } from '@mui/material';
import { BasicButton, CustomCancelMdCancel } from 'components/button';
import CustomTextField from 'components/inputs/CustomTextField';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ModalBackdrop } from './commonStyle';
import kakaoImg from 'assets/kakaologin.png';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from 'redux/userReducer';
import { localLogin } from '../../redux/userReducer';
import NaverLogin from 'react-naver-login';
import api from 'api/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoginOpenModal, setIsSignUpOpenModal }) => {
  const { token, user } = useSelector((state) => state?.auth);
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: '',
    password: '',
  });
  const [isNaverLogin, setIsNaverLogin] = useState(false);
  const { email, password } = value;

  const handleChange = (type) => (e) => {
    setValue({ ...value, [type]: e.target.value });
  };
  useEffect(() => {
    if (!user) {
      setIsLoginOpenModal(true);
    } else {
      setIsLoginOpenModal(false);
    }
  }, [user]);
  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      return alert('필드의 내용을 다시 입력해주세요');
    }
    let body = { email, password };
    dispatch(localLogin(body));
  };

  const handleClosingModal = useCallback((type) => {
    if (type == '닫기') {
      setIsLoginOpenModal(false);
    }
    setIsLoginOpenModal(false);
  }, []);

  const initializeNaverLogin = () => {
    const { naver } = window;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_CLIENT_ID_NAVER,
      callbackUrl: 'http://localhost:3000/oauth/naver/callback',
      clientSecret: process.env.REACT_APP_CLIENT_SECRET_NAVER,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: {
        color: 'green',
        type: 3,
        height: '60',
      }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
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
              onChange={handleChange('email')}
              style={InputStyle}
              type='text'
              label={'이메일'}
              variant='outlined'
            />
            <CustomTextField
              onChange={handleChange('password')}
              style={InputStyle}
              type='password'
              label={'비밀번호'}
              variant='outlined'
            />
          </TextFieldStyle>
          <div style={{ flex: 1 }}>
            <BasicButton
              text={'로그인'}
              onClick={() => {
                handleLogin();
              }}
            />
            <div style={{ marginTop: '10px' }}>
              <BasicButton
                onClick={() => {
                  setIsSignUpOpenModal(true);
                  setIsLoginOpenModal(false);
                }}
                text={'회원가입'}
              />
            </div>
            {/* <Img src={kakaoImg} /> */}
            {/* <NaverLogin
              clientId={'rleZtljmgGlKwMlyqz4J'}
              callbackUrl={`http://localhost:3000/oauth/naver/callback`}
              render={(props) => (
                <LoginBox
                  onClick={(e) => {
                    console.log(props);
                    props.onClick(e);
                  }}
                >
                  네이버 로그인
                </LoginBox>
              )}
              onSuccess={(e) => {
                console.log(e);
              }}
              onFailure={(e) => console.error(e)}
            /> */}
            <div ref={ref} hidden id='naverIdLogin'></div>
            <LoginBox kakao={true}>카카오 로그인</LoginBox>
            <LoginBox
              onClick={() => {
                ref.current.children[0].click();
              }}
              id='naverIdLogin'
            >
              <p>네이버 로그인</p>
            </LoginBox>
          </div>
        </LoginForm>
      </BoxContainer>
    </ModalBackdrop>
  );
};

export default Login;
const LoginBox = styled.div`
  height: 70px;
  p {
  }
  a {
    display: flex;
    align-items: center;
    display: none;
    img {
      max-width: 100%;
    }
  }
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => {
    return props.kakao === true ? '#FEE500' : '#03c75a';
  }};
  display: flex;
  margin: 10px 0px;
  border-radius: 10px;
  color: white;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;
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
