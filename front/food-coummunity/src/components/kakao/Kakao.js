//Kakao.js
import React, { useEffect } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Kakao = ({ setIsShow, isShow }) => {
  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');
  const navigate = useNavigate();
  const codeFunction = async () => {
    try {
      const res = await api.post(`user/auth/kakao/callback?code=${code}`);
      if (res.status === 'success') {
        setIsShow(true);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    codeFunction();
  }, []);

  return (
    <div>
      <div>로그인중</div>
    </div>
  );
};

export default Kakao;
