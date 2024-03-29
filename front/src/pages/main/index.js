import KakaoMap from 'components/kakao/KakaoMap';
import NavBar from 'components/navbar';
import React, { useCallback, useEffect, useState } from 'react';
import S from './styles';
import MuiTab from '../../components/MuiTab';
import SearchInput from 'components/inputs/SearchInput';
import { Map, useMap } from 'react-kakao-maps-sdk';
import api from 'api/api';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const { kakao } = window;
const Main = () => {
  const [value, setValue] = useState('0');
  const { token, user } = useSelector((state) => state.auth);

  const [selectData, setSelectData] = useState({
    x: '',
    y: '',
  });
  const [markerData, setMarkerData] = useState([]);
  const [searchAddress, SetSearchAddress] = useState();
  const [isGeolocation, setIsGeolocation] = useState(false);
  const [mainSearchAddressCenter, SetMainSearchAddressCenter] = useState();
  const [page, setPage] = useState();
  const [selectKeywordData, setKeywordData] = useState({});

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);
  const handleClick = (data, type) => {
    if (type === '모집현황') {
      SetMainSearchAddressCenter({
        center: { lat: data?.y, lng: data?.x },
      });
    } else {
      if (data) {
        setValue('1');
      }
      setSelectData({ ...selectData, x: data?.x, y: data?.y });
    }
  };

  const SearchMap = () => {
    const ps = new kakao.maps.services.Places();

    const placesSearchCB = function (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = data[0];
        setIsGeolocation(true);
        SetMainSearchAddressCenter({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
        setPage(pagination);
        setMarkerData(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    };

    ps.keywordSearch(`${searchAddress}`, placesSearchCB, {
      category_group_code: 'FD6',
      size: 5,
    });
    SetSearchAddress('');
  };

  const handleSearchAddress = (e) => {
    SetSearchAddress(e.target.value);
  };
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      SearchMap();
      setValue('0');
    }
  };
  const handleCreateClick = async (data, setValue, select) => {
    // if (data?.title === '' || data?.content === '') {
    //   alert('모든 필드를 입력해주세요');
    //   return;
    // }

    await setValue({ ...data, lat: selectData?.x, lng: selectData?.y });

    // console.log(data);

    // console.log(newData);

    try {
      console.log(data);

      const res = await api.post(`recurit`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      alert('모집 성공');
      setValue('0');
    } catch (e) {
      if (e?.response?.data?.msg) {
        alert(e?.response?.data?.msg);
      }
      console.log(e?.response);
    }
  };
  return (
    <div>
      <S.RootMainStyle>
        <NavBar />

        <S.SectionMainStyle>
          <SearchInput
            onChange={handleSearchAddress}
            onKeyPress={onKeyPress}
            value={searchAddress}
          />
          <KakaoMap
            SetMainSearchAddressCenter={SetMainSearchAddressCenter}
            handleCreateClick={handleCreateClick}
            setIsGeolocation={setIsGeolocation}
            selectKeywordData={selectKeywordData}
            isGeolocation={isGeolocation}
            markerData={markerData}
            mainSearchAddressCenter={mainSearchAddressCenter}
            handleClick={handleClick}
            selectData={selectData}
            setSelectData={setSelectData}
            handleChange={handleChange}
            value={value}
            setValue={setValue}
            page={page}
          />
        </S.SectionMainStyle>
      </S.RootMainStyle>
    </div>
  );
};

export default Main;
