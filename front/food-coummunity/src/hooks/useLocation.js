import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { geomylocation } from 'redux/utilReducer';

const useLocation = (options = {}) => {
  const dispatch = useDispatch();
  // location 정보 저장
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({
    // 지도의 초기 위치
    latitude: 37.49676871972202,
    longitude: 127.02474726969814,
  });
  // 에러 메세지 저장
  const [error, setError] = useState();

  // Geolocation의 `getCurrentPosition` 메소드에 대한 성공 callback 핸들러
  const handleSuccess = async (pos) => {
    const { latitude, longitude } = pos.coords;
    setLocation({
      latitude,
      longitude,
    });
    setIsLoading(false);
    dispatch(geomylocation(isLoading));
  };

  // Geolocation의 `getCurrentPosition` 메소드에 대한 실패 callback 핸들러
  const handleError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('현재 위치가 지원되지 않습니다.');
      setIsLoading(false);
    }

    // Geolocation API 호출
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error, isLoading };
};

export default useLocation;
