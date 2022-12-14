import React from "react";

const Kakaoform = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_APP_KEY;
  const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  //현재 윈도우 창의 주소값 불러옴

  //Login.js
  return <a href={KAKAO_AUTH_URL}>카카오로 로그인하기</a>;
};

export default Kakaoform;
