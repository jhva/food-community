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
  setRecruitsData,
  currentPage,
  currentRecruitmentHandleLocation,
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
      setRecruitsData(res?.data?.data);
      setRecruitData(res?.data?.data);
    } catch (e) {
      if (e?.response?.data?.msg) {
        alert(e?.response?.data?.msg);
      }
      console.log(e?.response);
    }
  };
  const attendWithDelete = async (type, data, id) => {
    let body = {
      RecruitId: data?.id,
      isAttend: 'Y',
      statusNumber: data?.statusNumber,
      maxinum: data.maxinum,
    };
    try {
      const res = await api.post('/attend', body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      alert('참가 성공!');
    } catch (e) {
      console.log(e);
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
        <h4>
          {getRecruitData.length === 0
            ? '현재 모집중인 그룹이 없어요!'
            : '현재 그룹 모집중이에요!'}
        </h4>
        {getRecruitData
          .slice((page - 1) * perpage, (page - 1) * perpage + perpage)
          .map((item, index) => (
            <RecruitBox
              onClick={() => {
                // console.log(item);
                currentRecruitmentHandleLocation(item);
              }}
              key={index}
            >
              <ButtonBox>
                <p>{item?.title}</p>
                {user?.id !== item?.UserId ? (
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        attendWithDelete('참가', item);
                      }}
                    >
                      참가
                    </button>
                  </div>
                ) : null}
              </ButtonBox>

              <p>{item?.content}</p>
              <p>
                인원 상태: {item?.statusNumber} / {item?.maxinum}
              </p>
            </RecruitBox>
          ))}
        {getRecruitData?.length === 0 ? null : (
          <PageNation
            perpage={perpage}
            page={page}
            setPage={setPage}
            data={getRecruitData}
          />
        )}
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
  padding: 0px 10px;
  flex-direction: column;
  border-radius: 10px;
  background: #d8f781;
  cursor: pointer;
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

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  button {
    width: 50px;
    padding: 5px 0px;
    background-color: #a9bcf5;
    margin-left: 10px;
  }
`;
