import { CustomMdOutlineArrowBackIosNew } from 'components/button';
import { TopContainerStyle } from 'pages/board/boardStyle';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ text }) => {
  const navigate = useNavigate();
  return (
    <TopContainerStyle>
      <CustomMdOutlineArrowBackIosNew
        style={{ marginLeft: '10px' }}
        onClick={() => {
          navigate(-1);
        }}
      />
      <h3>{text} </h3>
    </TopContainerStyle>
  );
};

export default TopBar;
