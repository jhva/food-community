import KakaoMap from 'components/kakao/KakaoMap';
import NavBar from 'components/navbar';
import React from 'react';

const Main = () => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <KakaoMap />
    </div>
  );
};

export default Main;
