import KakaoMap from 'components/kakao/KakaoMap';
import NavBar from 'components/navbar';
import React, { useState } from 'react';
import S from './styles';
import MuiTab from '../../components/MuiTab';
import SearchInput from 'components/inputs/SearchInput';

const { kakao } = window;

const Main = () => {
  const [value, setValue] = useState('0');
  const [selectData, setSelectData] = useState([]);
  const [markerData, setMarkerData] = useState([]);

  const [searchAddress, SetSearchAddress] = useState();
  const [isGeolocation, setIsGeolocation] = useState(false);
  const [mainSearchAddressCenter, SetMainSearchAddressCenter] = useState();
  const [selectSearchonClick, setSelectSearchOnClick] = useState([]);

  const handleChange = React.useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const handleClick = React.useCallback(
    (data, makerSet) => {
      if (data) {
        setValue('1');
        setSelectData(data);
      }
    },
    [selectData]
  );

  const SearchMap = () => {
    const ps = new kakao.maps.services.Places();
    const placesSearchCB = function (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = data[0];
        setIsGeolocation(true);
        SetMainSearchAddressCenter({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
        setMarkerData(data);
      }
    };
    ps.keywordSearch(`${searchAddress}`, placesSearchCB);
    SetSearchAddress('');
  };
  // console.log(searchData);
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
    <>
      <S.RootMainStyle>
        <NavBar isGeolocation={isGeolocation} />
        <S.SectionMainStyle>
          <SearchInput
            onChange={handleSearchAddress}
            onKeyPress={onKeyPress}
            value={searchAddress}
          />
          <KakaoMap
            isGeolocation={isGeolocation}
            markerData={markerData}
            mainSearchAddressCenter={mainSearchAddressCenter}
            handleClick={handleClick}
          />
          <MuiTab
            markerData={markerData}
            selectData={selectData}
            setSelectData={setSelectData}
            handleChange={handleChange}
            value={value}
            setValue={setValue}
          />
        </S.SectionMainStyle>
      </S.RootMainStyle>
    </>
  );
};

export default Main;
