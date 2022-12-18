import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import styled from 'styled-components';

const RecruitmentStatus = ({ markerData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  console.log(markerData);
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': {
          m: 1,
          width: '100%',
          overflow: 'scroll',
          height: '750px',
        },
      }}
      noValidate
      autoComplete='off'
    >
      <div>
        <h3 style={{ cursor: 'pointer' }} onClick={handleOpen}>
          검색 결과 리스트 보기
        </h3>

        {markerData?.map((item) => (
          <SearchBoxStyle
            onClick={() => {
              console.log(item);
            }}
          >
            <div>
              <p>{item?.address_name}</p>
              <p>{item?.place_name}</p>
              <p>{item?.phone}</p>
            </div>
          </SearchBoxStyle>
        ))}
      </div>
    </Box>
  );
};

export default RecruitmentStatus;

const SearchBoxStyle = styled.div`
  width: 100%;
  margin: 10px 0px;
`;
