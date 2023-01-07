import KakaoMap from 'components/kakao/KakaoMap';
import NavBar from 'components/navbar';
import React, { useCallback, useState } from 'react';
import S from './styles';
import MuiTab from '../../components/MuiTab';
import SearchInput from 'components/inputs/SearchInput';
import { Map, useMap } from 'react-kakao-maps-sdk';

const { kakao } = window;
const Main = () => {
  const [value, setValue] = useState('0');

  const [selectData, setSelectData] = useState([]);
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
        center: { lat: data.y, lng: data.x },
      });
    } else {
      if (data) {
        setValue('1');
        setSelectData(data);
      }
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
