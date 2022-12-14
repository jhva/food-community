import KakaoMap from 'components/kakao/KakaoMap';
import NavBar from 'components/navbar';
import React from 'react';
import S from './styles';
import MuiTab from '../../components/MuiTab';

const Main = () => {
  return (
    <>
      <S.RootMainStyle>
        <NavBar />
        <S.SectionMainStyle>
          <KakaoMap />
          {/* <div style={{ flex: 1 }}></div> */}
        </S.SectionMainStyle>
      </S.RootMainStyle>
    </>
  );
};

export default Main;
