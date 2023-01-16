import React from 'react';
import styled from 'styled-components';

const PageNotFound = () => {
  return <NotFound>404 not found</NotFound>;
};

export default PageNotFound;

const NotFound = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 50px;
  align-items: center;
`;
