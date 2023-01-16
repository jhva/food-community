import api from 'api/api';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NaverLoginCallback = () => {
  let params = new URL(document.URL).searchParams;
  let code = params.get('access_token');
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const tryNaverLogin = async () => {
    let body = {};
    try {
      const res = await api.post(`/auth/naver-login`, body);
      if (res.msg === 'success') {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    tryNaverLogin();
  }, []);

  console.log(params);
  return <div>네이버 로그인중 입니다</div>;
};

export default NaverLoginCallback;
