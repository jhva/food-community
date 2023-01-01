import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import styled from 'styled-components';
import { useMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import CustomMapMarker from 'components/kakao/CustomMapMarker';
import { isDisabled } from '@testing-library/user-event/dist/utils';
const { kakao } = window;

const RecruitmentStatus = ({ handleClick, markerData, page }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isdisabled, setIsDisabled] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handlePage = () => {
    if (page.hasNextPage === true) {
      page.nextPage();
    }
    if (page.hasNextPage === false) {
      return alert('마지막 페이지 입니다');
    }
  };
  const handlePrevPage = () => {
    if (page.hasPrevPage === true) {
      page.prevPage();
    }
    if (page.hasPrevPage === false) {
      return alert('첫번째 페이지 입니다');
    }
  };

  return (
    <>
      <h4 onClick={handleOpen}> 검색 결과 리스트 보기👇</h4>

      <Box
        component='div'
        sx={{
          '& > :not(style)': {
            width: '100%',
            height: '370px',
            overflow: 'auto',
          },
        }}
        autoComplete='on'
      >
        <div>
          <div>
            {isOpen &&
              markerData?.map((item, key) => (
                <SearchBoxStyle
                  onClick={() => {
                    console.log(item);
                  }}
                  key={key}
                >
                  <SearchContainer>
                    <p>{item?.address_name}</p>
                    <p>{item?.place_name}</p>
                    <p>{item?.phone}</p>
                  </SearchContainer>
                </SearchBoxStyle>
              ))}
            {isOpen && markerData.length !== 0 && (
              <CustomBox>
                <button
                  onClick={() => {
                    handlePrevPage();
                  }}
                >
                  이전
                </button>
                <button
                  onClick={() => {
                    handlePage();
                  }}
                >
                  다음
                </button>
              </CustomBox>
            )}
          </div>
        </div>
      </Box>
    </>
  );
};

export default RecruitmentStatus;
const CustomBox = styled.div`
  display: flex;
  column-gap: 10px;
`;

const Button = styled.button``;

const SearchContainer = styled.div`
  margin: 10px 0px;
`;

const SearchBoxStyle = styled.div`
  cursor: pointer;
  /* height: 440px; */
`;
