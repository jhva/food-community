import React, { useEffect, useState } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import useLocation from '../../hooks/useLocation';
import { geolocationOptions } from '../../constants/geolcation';
import Loading from 'components/common/Loading';
import MuiTab from 'components/MuiTab';
import styled from 'styled-components';
import CustomMapMarker from './CustomMapMarker';
import { useDispatch } from 'react-redux';
import { POSITION } from 'redux/utilReducer';

const KakaoMap = ({
  handleClick,
  mainSearchAddressCenter,
  markerData,
  setIsGeolocation,
  isGeolocation,
  selectData,
  setSelectData,
  selectKeywordData,
  page,
  handleCreateClick,
  handleChange,
  SetMainSearchAddressCenter,
  value,
  setValue,
}) => {
  const { location, error, isLoading } = useLocation(geolocationOptions);
  const dispatch = useDispatch();
  const [position, setPosition] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [recruitsData, setRecruitsData] = useState([]);
  // console.log(recruitsData);
  const [initLocation, setInitLocation] = useState({
    // 지도의 초기 위치
    lat: location.latitude,
    lng: location.longitude,
    isPanTo: false,
  });
  const [map, setMap] = useState();

  const [info, setInfo] = useState();

  // 주소 검색시 위치로 이동
  const mainSearch = () => {
    {
      mainSearchAddressCenter &&
        setInitLocation({
          // lat: y,
          // lng: x,
          lat: mainSearchAddressCenter.center.lat,
          lng: mainSearchAddressCenter.center.lng,
        });
    }
  };

  const currentRecruitmentHandleLocation = (item) => {
    console.log(item);
    setIsGeolocation(true);
    setInitLocation({
      lat: item?.lat,
      lng: item?.lng,
      isPanTo: true,
      item,
    });
  };

  const handleErrorGeolocation = () => {
    alert('현재 위치를 찾지못하였습니다');
  };
  const handleMapInfo = () => {
    {
      map &&
        setInfo({
          center: {
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          },
          level: map.getLevel(),
          typeId: map.getMapTypeId(),
          swLatLng: {
            lat: map.getBounds().getSouthWest().getLat(),
            lng: map.getBounds().getSouthWest().getLng(),
          },
          neLatLng: {
            lat: map.getBounds().getNorthEast().getLat(),
            lng: map.getBounds().getNorthEast().getLng(),
          },
        });
    }
  };

  // console.log(isGeolocation);
  useEffect(() => {
    mainSearch();
  }, [mainSearchAddressCenter]);
  // console.log(isGeolocation);
  useEffect(() => {
    // console.log('4, 지도의 정보를 다시 받아옴')
    handleMapInfo();
  }, [map, initLocation]);
  return (
    <>
      {isLoading ? (
        <>
          {error ? (
            <div style={{ margin: '0 auto' }}>
              웹 페이지의 위치정보를 확인해주세요 !
            </div>
          ) : (
            <Loading text={'🙌 현재 위치를 가져오고있어요!!'} />
          )}
        </>
      ) : (
        <>
          <Map // 지도를 표시할 Container
            isPanto={initLocation?.isPanTo}
            center={{
              // lat: initLocation.lat,
              // lng: initLocation.lng,
              lat: !isGeolocation ? location?.latitude : initLocation?.lat,
              lng: !isGeolocation ? location?.longitude : initLocation?.lng,
            }}
            style={{
              width: '77%',
              height: '87vh',
            }}
            level={4} // 지도의 확대 레벨
            onCreate={(map) => setMap(map)}
            onIdle={handleMapInfo} // 중심 좌표나 확대 수준이 변경됐을 때
            // onClick={(_t, mouseEvent) => {
            //   setPosition({
            //     lat: mouseEvent.latLng.getLat(),
            //     lng: mouseEvent.latLng.getLng(),
            //   });
            //   // dispatch(
            //   //   POSITION({
            //   //     lat: mouseEvent.latLng.getLat(),
            //   //     lng: mouseEvent.latLng.getLng(),
            //   //   })
            //   // );
            // }}
          >
            {/* {initLocation && (
              <MapMarker
                onMouseOver={() => setIsVisible(true)}
                onMouseOut={() => setIsVisible(false)}
                position={{
                  lat: initLocation?.lat,
                  lng: initLocation?.lng,
                }}
              >
                {isVisible && initLocation?.item?.title}
              </MapMarker>
            )}
            {position && <MapMarker position={position}>선택한위치</MapMarker>} */}
            <MapMarker
              position={{
                lat: location?.latitude,
                lng: location?.longitude,
              }}
            >
              <div style={{ padding: '5px', color: '#000' }}>
                현재위치입니다
                {/* {state.errMsg ? state.errMsg : '여기에 계신가요?!'} */}
              </div>
            </MapMarker>
            <MuiTab
              setRecruitsData={setRecruitsData}
              currentRecruitmentHandleLocation={
                currentRecruitmentHandleLocation
              }
              position={position}
              handleCreateClick={handleCreateClick}
              handleClick={handleClick}
              markerData={markerData}
              selectData={selectData}
              setSelectData={setSelectData}
              handleChange={handleChange}
              value={value}
              page={page}
              setValue={setValue}
            />
            {markerData &&
              markerData.map((el, index) => (
                <div key={index}>
                  <CustomMapMarker
                    index={index}
                    el={el}
                    handleClick={(e) => {
                      handleClick(el, e, 'type');
                    }}
                  />
                </div>
              ))}
          </Map>
        </>
      )}
    </>
  );
};

const SearchDisplay = styled.div`
  position: relative;
`;
export default KakaoMap;
