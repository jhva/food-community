import React from 'react';
import { useLocation } from 'react-router-dom';

const NaverLoginCallback = () => {
  let params = new URL(document.URL).searchParams;
  let code = params.get('access_token');
  const location = useLocation();
  console.log(location);

  console.log(params);
  return <div>네이버 로그인중 입니다</div>;
};

export default NaverLoginCallback;
