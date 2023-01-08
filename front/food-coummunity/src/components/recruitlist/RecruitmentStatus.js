import React, { useCallback, useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import styled from 'styled-components';
import { useMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import CustomMapMarker from 'components/kakao/CustomMapMarker';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import api from 'api/api';
import { useSelector } from 'react-redux';
import PageNation from 'components/pagenation';
const { kakao } = window;

const RecruitmentStatus = ({
  handleClick,
  markerData,
  currentPage,
  mainSearch,
}) => {
  const { token, user } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [getRecruitData, setRecruitData] = useState([]);

  const perpage = 5;

  const handleOpen = () => {
    if (markerData.length === 0) {
      alert('검색 된 내용이 없어요!');
    }
    setIsOpen(!isOpen);
  };

  const handlePage = useCallback(() => {
    if (currentPage.hasNextPage === true) {
      currentPage.nextPage();
    }
    if (currentPage.hasNextPage === false) {
      return alert('마지막 페이지 입니다');
    }
  }, [currentPage]);
  const handlePrevPage = useCallback(() => {
    if (currentPage.hasPrevPage === true) {
      currentPage.prevPage();
    }
    if (currentPage.hasPrevPage === false) {
      return alert('첫번째 페이지 입니다');
    }
  }, [currentPage]);

  const getRecruits = async () => {
    try {
      const res = await api.get(`recurit`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      setRecruitData(res?.data?.data);
    } catch (e) {
      if (e?.response?.data?.msg) {
        alert(e?.response?.data?.msg);
      }
      console.log(e?.response);
    }
  };
  useEffect(() => {
    getRecruits();
  }, []);
  return (
    <>
      <div>
        <h4>현재 그룹 모집중이에요!</h4>
        {getRecruitData
          .slice((page - 1) * perpage, (page - 1) * perpage + perpage)
          .map((item, index) => (
            <ul>
              <RecruitBox key={index}>
                <div>
                  <p>{item?.title}</p>
                  <p>{item?.content}</p>
                  <p>
                    인원 상태: {item?.statusNumber} / {item?.maxinum}
                  </p>
                </div>
              </RecruitBox>
            </ul>
          ))}
        <PageNation
          perpage={perpage}
          page={page}
          setPage={setPage}
          data={getRecruitData}
        />
      </div>
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
            display: markerData.length === 0 && 'none',
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
                    style={{
                      cursor: 'pointer',
                    }}
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

const RecruitBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: #d8f781;
  width: 100%;
  margin: 10px 0px;
  p {
    margin: 10px 0px;
  }
`;

const SearchContainer = styled.div`
  margin: 10px 0px;
`;

const SearchBoxStyle = styled.div`
  /* height: 440px; */
`;
