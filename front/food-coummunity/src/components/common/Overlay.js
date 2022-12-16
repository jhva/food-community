import React from 'react';
import styled from 'styled-components';

const Overlay = (props) => {
  console.log(props);
  return (
    <>
      <div>{props.place}</div>;
    </>
  );
};

export default Overlay;

const Box = styled.div``;
