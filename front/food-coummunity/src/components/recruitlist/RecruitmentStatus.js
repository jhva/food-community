import React from 'react';
import { Box, TextField } from '@mui/material';
import SearchInput from '../inputs/SearchInput';

const RecruitmentStatus = () => {
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete='off'
    ></Box>
  );
};

export default RecruitmentStatus;
