import api from 'api/api';
import TopBar from 'components/TopBar';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const BoardDetail = () => {
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (!location?.state) {
      alert('/');
      return;
    }
  }, [location]);

  const detailGetBoard = async () => {
    try {
      const res = await api.get(`board/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(res);
    } catch (e) {
      if (e?.response?.data?.msg) {
        alert(e?.response?.data?.msg);
      }
      console.log(e?.response);
    }
  };

  useEffect(() => {
    detailGetBoard();
  }, []);
  return (
    <div>
      <div style={{ paddigBottom: '20px' }}>
        <TopBar text={`${location?.state?.title}`} />
      </div>
    </div>
  );
};

export default BoardDetail;
