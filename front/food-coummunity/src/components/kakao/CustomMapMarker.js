import React from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';

const CustomMapMarker = ({ index, el, handleClick }) => {
  const map = useMap();
  return (
    <div>
      <MapMarker
        image={{
          src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
          size: {
            width: 24,
            height: 35,
          }, // 마커이미지의 크기입니다
        }}
        position={{
          lat: el.y,
          lng: el.x,
        }}
        onClick={(data) => {
          handleClick(data);
          map.panTo(data.getPosition());
          // map.panTo(data.getPosition());
        }}
      />
    </div>
  );
};

export default CustomMapMarker;
