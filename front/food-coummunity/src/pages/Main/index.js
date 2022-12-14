import KakaoMap from 'components/kakao/KakaoMap';
import NavBar from 'components/navbar';
import React from 'react';
import S from './styles';

const Main = () => {
  return (
    <S.RootMainStyle>
      <NavBar />
      <KakaoMap />
    </S.RootMainStyle>
  );
};

export default Main;
