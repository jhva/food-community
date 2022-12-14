import React from 'react';
import styled from 'styled-components';
import Spinner from 'assets/Spinner-1s-200px.gif';

const Loading = (props) => {
  return (
    <Background>
      <LoadingText>{props.text}</LoadingText>
      <img src={Spinner} alt='로딩중' width='5%' />
    </Background>
  );
};

export default Loading;

export const Background = styled.div`
  width: 65%;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;
