import React from 'react';
import Box from '@mui/material/Box';

import CustomTextField from 'components/inputs/CustomTextField';

const CreateRecruitment = () => {
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete='off'
    >
      <CustomTextField label={'모집 제목'} />
      <CustomTextField label={'모집 주소'} />
      <CustomTextField label={'모집 인원'} />
      <CustomTextField
        asd={'standard-multiline-flexible'}
        multiline
        maxRows={4}
        variant='standard'
        placeholder='최대 4줄 까지 작성가능합니다'
        label={'모집 내용'}
      />

      {/* <TextField id='standard-basic' label='모집 기간' variant='standard' /> */}
    </Box>
  );
};

export default CreateRecruitment;
