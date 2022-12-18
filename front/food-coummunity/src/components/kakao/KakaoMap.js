import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useLocation from '../../hooks/useLocation';
import { geolocationOptions } from '../../constants/geolcation';
import Loading from 'components/common/Loading';
import MuiTab from 'components/MuiTab';
import SearchInput from 'components/inputs/SearchInput';
import styled from 'styled-components';

const KakaoMap = ({
  handleClick,
  mainSearchAddressCenter,
  markerData,
  isGeolocation,
}) => {
  const { location, error, isLoading } = useLocation(geolocationOptions);

  const [initLocation, setInitLocation] = useState({
    // 지도의 초기 위치
    lat: location.latitude,
    lng: location.longitude,
  });
  const [map, setMap] = useState();
  const [info, setInfo] = useState();

  // 주소 검색시 위치로 이동
  const mainSearch = () => {
    {
      mainSearchAddressCenter &&
        setInitLocation({
          lat: mainSearchAddressCenter.center.lat,
          lng: mainSearchAddressCenter.center.lng,
        });
    }
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
          <Loading text={'🙌 현재 위치를 가져오고있어요!!'} />
        </>
      ) : (
        <>
          <Map // 지도를 표시할 Container
            center={{
              // lat: initLocation.lat,
              // lng: initLocation.lng,
              lat: !isGeolocation ? location.latitude : initLocation.lat,
              lng: !isGeolocation ? location.longitude : initLocation.lng,
            }}
            style={{
              width: '77%',
              height: '87vh',
            }}
            level={4} // 지도의 확대 레벨
            onCreate={(map) => setMap(map)}
            onIdle={handleMapInfo} // 중심 좌표나 확대 수준이 변경됐을 때

            // onIdle={handleMapInfo} // 중심 좌표나 확대 수준이 변경됐을 때
          >
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
            {markerData &&
              markerData.map((el, index) => (
                <MapMarker
                  onClick={(e) => {
                    handleClick(el);
                  }}
                  image={{
                    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                    size: {
                      width: 24,
                      height: 35,
                    }, // 마커이미지의 크기입니다
                  }}
                  title={markerData && el?.title}
                  key={index}
                  position={{
                    lat: !isGeolocation ? location?.latitude : el.y,
                    lng: !isGeolocation ? location?.longitude : el.x,
                  }}
                >
                  <div
                    style={{
                      height: '50px',
                    }}
                  >
                    {el?.placename}
                  </div>
                </MapMarker>
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
