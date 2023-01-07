import React, { useCallback, useEffect, useState } from 'react';
import { CommonModal } from './index';
import styled from 'styled-components';
import {
  BasicButton,
  CustomBackBiArrow,
  CustomCancelMdCancel,
} from 'components/button';
import CustomTextField from 'components/inputs/CustomTextField';
import { PhoneNumberConvert } from 'utils';

import { useDispatch, useSelector } from 'react-redux';

import api from 'api/api';
import { connectSignUp, SIGNUPSTATE } from 'redux/userReducer';

const SignUp = ({ setIsSignUpOpenModal, setIsLoginOpenModal }) => {
  const dispatch = useDispatch();
  const { signUpState } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    nickname: '',
    isMarketing: 'Y',
    password_check: '',
  });
  const [isError, setIsError] = useState({
    isPassword: false,
    isPwdCheck: false,
    isEmail: false,
    isNickName: false,
    isPhoneNumber: false,
    isUserName: false,
    isAllErr: false,
  });
  const [label, setLabel] = useState({
    passwordMsg: '',
    passwordCheck: '',
    labelEmail: '',
    labelUsername: '',
    labelNickname: '',
    labelPhoneNumber: '',
    errorAll: '',
  });

  const handleSignup = async () => {
    const { email, username, password, nickname, phoneNumber, password_check } =
      userInfo;
    if (!email || !username || !password || !nickname || !phoneNumber) {
      alert('정보를 모두 기입해주세요');
      return;
    }
    if (isError.isPassword) {
      alert('비밀번호를 다시 한번 확인해주세요');
      return;
    }
    if (password !== password_check) {
      alert('비밀번호를 다시한번 확인해주세요');
      return;
    }
    let body = {
      email,
      username,
      phoneNumber,
      nickname,
      password,
      isMarketing: 'Y',
    };
    try {
      const { data } = await api.post('user/signup', body);
      console.log(data);
      alert('회원가입이 완료되었습니다');
      setIsSignUpOpenModal(false);
      setIsLoginOpenModal(true);

      // dispatch(data);
    } catch (e) {
      if (e?.response?.data?.msg) {
        alert(e?.response?.data?.msg);
      }
      console.log(e?.response);
    }
  };

  const handleChange = (type) => (e) => {
    setUserInfo({ ...userInfo, [type]: e.target.value });

    if (type === 'password') {
      if (userInfo.password.length < 6) {
        setLabel({ ...label, passwordMsg: '비밀번호는 최소 7자리이상입니다' });
        setIsError({ ...isError, isPassword: true });
      } else {
        setIsError({ ...isError, isPassword: false });
      }
    }
    if (type === 'password_check') {
      if (e.target.value !== userInfo.password) {
        setIsError({ ...isError, isPwdCheck: true });
        setLabel({ ...label, passwordCheck: '비밀번호를 다시확인해주세요' });
      } else {
        setIsError({ ...isError, isPwdCheck: false });
      }
    }
    if (type === 'phoneNumber') {
      setUserInfo({
        ...userInfo,
        [type]: PhoneNumberConvert(e.target.value),
      });
    }
  };
  const handleClosingModal = useCallback((type) => {
    if (type == '닫기') {
      setIsSignUpOpenModal(false);
    }
    if (type == '뒤로') {
      setIsSignUpOpenModal(false);
      setIsLoginOpenModal(true);
    }
    setIsSignUpOpenModal(false);
  }, []);
  return (
    <CommonModal
      onClick={() => {
        handleClosingModal();
      }}
    >
      <LoginForm
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TopBar>
          <CustomBackBiArrow
            onClick={() => {
              handleClosingModal('뒤로');
            }}
          />
          <CustomCancelMdCancel
            onClick={() => {
              handleClosingModal('닫기');
            }}
          />
        </TopBar>
        <TitleBox>회원가입</TitleBox>
        <TextFieldStyle>
          <CustomTextField
            onChange={handleChange('email')}
            style={InputStyle}
            type='text'
            label={'이메일'}
            variant='outlined'
          />
          <CustomTextField
            style={InputStyle}
            type='password'
            onChange={handleChange('password')}
            label={isError.isPassword ? label.passwordMsg : '비밀번호'}
            error={isError.isPassword}
            variant='outlined'
          />
          <CustomTextField
            onChange={handleChange('password_check')}
            style={InputStyle}
            type='password'
            label={isError.isPwdCheck ? label.passwordCheck : '비밀번호 확인'}
            error={isError.isPwdCheck}
            variant='outlined'
          />
          <CustomTextField
            style={InputStyle}
            onChange={handleChange('username')}
            type='text'
            label={'이름'}
            variant='outlined'
          />
          <CustomTextField
            style={InputStyle}
            type='text'
            onChange={handleChange('nickname')}
            label={'닉네임'}
            variant='outlined'
          />
          <CustomTextField
            style={InputStyle}
            type='text'
            inputProps={{ maxLength: 13 }}
            onChange={handleChange('phoneNumber')}
            value={userInfo.phoneNumber}
            label={'핸드폰 번호'}
            variant='outlined'
          />
        </TextFieldStyle>
        <BasicButton type='submit' onClick={handleSignup} text={'회원가입'} />
      </LoginForm>
    </CommonModal>
  );
};

export default SignUp;

const LoginForm = styled.form``;
const InputStyle = {
  width: '100%',
  marginBottom: '10px',
};
const BoxContainer = styled.div`
  width: 500px;
  height: 667px;
  padding: 20px;
  background-color: white;
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleBox = styled.div`
  text-align: center;
  margin: 10px 0px;
  white-space: pre-wrap;
`;
const TextFieldStyle = styled.div`
  margin-bottom: 30px;
`;
