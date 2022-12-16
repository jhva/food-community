import KakaoMap from 'components/kakao/KakaoMap';
import NavBar from 'components/navbar';
import React from 'react';
import S from './styles';
import MuiTab from '../../components/MuiTab';

const Main = () => {
  const [value, setValue] = React.useState('0');
  const [selectData, setSelectData] = React.useState([]);
  const [searchData, setSearchData] = React.useState([]);
  const handleChange = React.useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const handleClick = React.useCallback(
    (data, makerSet) => {
      if (data) {
        setValue('1');
        setSelectData(data);
        setSearchData(makerSet);
      }
    },
    [selectData]
  );

  return (
    <>
      <S.RootMainStyle>
        <NavBar />
        <S.SectionMainStyle>
          <KakaoMap setSearchData={setSearchData} handleClick={handleClick} />
          <MuiTab
            selectData={selectData}
            searchData={searchData}
            setSelectData={setSelectData}
            handleChange={handleChange}
            value={value}
            setValue={setValue}
          />

          {/* <div>1</div> */}
          {/* <div style={{ flex: 1 }}></div> */}
        </S.SectionMainStyle>
      </S.RootMainStyle>
    </>
  );
};

export default Main;
