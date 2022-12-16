import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

const RecruitmentStatus = ({ searchData }) => {
  console.log(searchData);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete='off'
    >
      <div>
        <h3 style={{ cursor: 'pointer' }} onClick={handleOpen}>
          검색 결과 리스트 보기👇
        </h3>
        {isOpen && searchData.map((item) => <p>{item}</p>)}
      </div>
    </Box>
  );
};

export default RecruitmentStatus;
