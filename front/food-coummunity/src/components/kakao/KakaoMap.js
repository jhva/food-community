import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useLocation from '../../hooks/useLocation';
import { geolocationOptions } from '../../constants/geolcation';
import Loading from 'components/common/Loading';

const KakaoMap = () => {
  const [map, setMap] = useState();
  const { location, error, isLoading } = useLocation(geolocationOptions);
  return (
    <>
      {isLoading ? (
        <Loading text={'🙌 현재 위치를 가져오고있어요!!'} />
      ) : (
        <Map // 지도를 표시할 Container
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{
            width: '65%',
            height: '100vh',
          }}
          level={3} // 지도의 확대 레벨
          onCreate={(map) => setMap(map)}
          // onIdle={handleMapInfo} // 중심 좌표나 확대 수준이 변경됐을 때
        >
          {/* {!state.isLoading && (
        <MapMarker position={state.center}>
          <div style={{ padding: '5px', color: '#000' }}>
            {state.errMsg ? state.errMsg : '여기에 계신가요?!'}
          </div>
        </MapMarker>
      )} */}
        </Map>
      )}
    </>
  );
};

export default KakaoMap;
