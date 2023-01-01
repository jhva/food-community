import React from 'react';
import Box from '@mui/material/Box';

import CustomTextField from 'components/inputs/CustomTextField';
import { BasicButton } from 'components/button';

const CreateRecruitment = ({ selectData, setSelectData }) => {
  const [value, setValue] = React.useState({
    title: '',
    maxinum: '',
    place: selectData.place_name,
    content: '',
    lat: selectData.y,
    lng: selectData.x,
  });
  const onChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateClick = () => {
    console.log(value);
  };
  return (
    <>
      <div style={{ marginBottom: '30px' }}>
        <Box
          component='form'
          sx={{
            '& > :not(style)': {
              m: 1,
              width: '100%',
            },
          }}
          noValidate
          autoComplete='off'
        >
          <h3>모집 장소는 지도에서 원하는 위치를 클릭해주세요!</h3>
          <CustomTextField
            name='title'
            onChange={(e) => {
              onChange(e);
            }}
            variant='standard'
            value={value.title}
            label={'모집 제목'}
          />
          <CustomTextField
            onChange={(e) => {
              onChange(e);
            }}
            variant='standard'
            name='maxinum'
            value={value.maxinum}
            label={'모집 인원'}
          />
          <CustomTextField
            onChange={(e) => {
              onChange(e);
            }}
            name='content'
            value={value.content}
            asd={'standard-multiline-flexible'}
            multiline
            maxRows={4}
            variant='standard'
            placeholder='최대 4줄 까지 작성가능합니다'
            label={'모집 내용'}
          />
          <CustomTextField
            style={{ paddingTop: '10px' }}
            variant='standard'
            placeholder={'모집 장소'}
            disabled
            value={selectData.place_name}
          />
          {/* <TextField id='standard-basic' label='모집 기간' variant='standard' /> */}
        </Box>
      </div>
      <div>
        <BasicButton onClick={handleCreateClick} text={'모집 하기'} />
      </div>
    </>
  );
};

export default CreateRecruitment;
