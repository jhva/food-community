import api from 'api/api';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LOGIN } from 'redux/userReducer';

const NaverLoginCallback = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userAccessToken = () => {
    window.location.href.includes('access_token') && getTryCallbackNaverToken();
  };
  const getTryCallbackNaverToken = async () => {
    // http://localhost:3000/oauth/naver/callback#access_token=AAAAO2-yX5IcKjNJa8dzD0erJiLxpy4-CHGstL3odUNzl_TcjZB9g1kKejRBOl3RF8hxa4jVDxmN0Uys5WTCjGh480k
    // &state=776832b1-8455-4727-9566-563952a8f7b1&token_type=bearer&expires_in=3600
    const token = window.location.href.split('=')[1].split('&')[0];
    const state = window.location.href.split('state=')[1].split('&')[0];
    // "=AAAAO2-yX5IcKjNJa8dzD0erJiLxpy4-CHGstL3odUNzl_TcjZB9g1kKejRBOl3RF8hxa4jVDxmN0Uys5WTCjGh480k&state=776832b1-8455-4727-9566-563952a8f7b1&token_type=bearer&expires_in=3600"
    let body = {
      accessToken: token,
      state,
    };
    try {
      const { data } = await api.post(`user/auth/naver-login`, body);
      if (data?.msg === 'success') {
        dispatch(LOGIN({ user: data, token: data.data.accesstoken }));

        navigate('/');
      }
    } catch (e) {
      if (e?.response?.data?.status === 403) {
        alert(e?.response?.data?.msg);
        navigate('/');
        return;
      }
      console.log(e);
    }
  };

  useEffect(() => {
    // tryNaverLogin();
    userAccessToken();
  }, []);

  return <div />;
};

export default NaverLoginCallback;
