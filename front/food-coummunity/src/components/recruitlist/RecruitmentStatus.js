import React, { useCallback, useState } from 'react';
import { Box, TextField } from '@mui/material';
import styled from 'styled-components';
import { useMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import CustomMapMarker from 'components/kakao/CustomMapMarker';
import { isDisabled } from '@testing-library/user-event/dist/utils';
const { kakao } = window;

const RecruitmentStatus = ({ handleClick, markerData, page, mainSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isdisabled, setIsDisabled] = useState(false);
  const handleOpen = () => {
    if (markerData.length === 0) {
      alert('검색 된 내용이 없어요!');
    }
    setIsOpen(!isOpen);
  };

  const handlePage = useCallback(() => {
    if (page.hasNextPage === true) {
      page.nextPage();
    }
    if (page.hasNextPage === false) {
      return alert('마지막 페이지 입니다');
    }
  }, [page]);
  const handlePrevPage = useCallback(() => {
    if (page.hasPrevPage === true) {
      page.prevPage();
    }
    if (page.hasPrevPage === false) {
      return alert('첫번째 페이지 입니다');
    }
  }, [page]);

  return (
    <>
      <h4 style={{ cursor: 'pointer' }} onClick={handleOpen}>
        검색 결과 리스트 보기👇
      </h4>

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
            {isOpen ||
              (markerData.length > 0 &&
                markerData?.map((item, key) => (
                  <SearchBoxStyle
                    onClick={() => {
                      handleClick(item, '모집현황');
                    }}
                    key={key}
                  >
                    <SearchContainer>
                      <p>{item?.address_name}</p>
                      <p>{item?.place_name}</p>
                      <p>{item?.phone}</p>
                    </SearchContainer>
                  </SearchBoxStyle>
                )))}

            {isOpen ||
              (markerData.length > 0 && (
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
              ))}
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
