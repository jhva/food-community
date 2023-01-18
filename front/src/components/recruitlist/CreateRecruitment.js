import React from 'react';
import Box from '@mui/material/Box';

import CustomTextField from 'components/inputs/CustomTextField';
import { BasicButton } from 'components/button';
import api from 'api/api';
import { useSelector } from 'react-redux';

const CreateRecruitment = ({ selectData, position, handleCreateClick }) => {
  const { user } = useSelector((state) => state?.auth);
  const [value, setValue] = React.useState({
    title: '',
    maxinum: '',
    // place: selectData.place_name,
    content: '',
    lat: position !== undefined ? position?.lat : selectData.y,
    lng: position !== undefined ? position?.lng : selectData.x,
    // placename: position !== undefined ? '' : selectData,
  });
  const onChange = (type) => (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
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
          <h3>
            지도에서 검색해서 마커를 클릭해서 추가하거나 원하는 지도에 마커를
            등록후 모집을할수있습니다
          </h3>
          <CustomTextField
            name='title'
            onChange={onChange('title')}
            variant='standard'
            value={value?.title}
            placeholder='모집 제목'
          />
          <CustomTextField
            onChange={onChange('maxinum')}
            variant='standard'
            name='maxinum'
            type='number'
            placeholder='모집 인원을 정해주세요 (본인포함 모집입니다)'
            value={value?.maxinum}
          />
          <CustomTextField
            onChange={onChange('content')}
            name='content'
            type='text'
            value={value?.content}
            asd={'standard-multiline-flexible'}
            variant='standard'
            placeholder='모집 내용'
          />
          {/* <CustomTextField
            style={{ paddingTop: '10px' }}
            variant='standard'
            placeholder={'모집 장소'}
            disabled
            onChange={(e) => {
              onChange(e);
            }}
            value={selectData?.place_name}
          /> */}
          {/* <TextField id='standard-basic' label='모집 기간' variant='standard' /> */}
        </Box>
      </div>
      <div>
        <BasicButton
          onClick={async () => {
            if (!user) {
              alert('로그인 후 이용해주세요');
              return;
            }
            handleCreateClick(value, setValue, selectData, position);
          }}
          text={'모집 하기'}
        />
      </div>
    </>
  );
};

export default CreateRecruitment;
