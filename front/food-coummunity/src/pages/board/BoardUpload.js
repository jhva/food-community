import api from 'api/api';
import TopBar from 'components/TopBar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  RootStyle,
  UploadSubContentStyle,
  UploadTopStyle,
} from './boardStyle';

const BoardUpload = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state?.auth);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  }, [user]);

  const [board, setBoard] = useState({
    title: '',
    content: '',
  });

  const handleChange = (type) => (e) => {
    setBoard({ ...board, [type]: e.target.value });
  };

  const uploadBoard = async () => {
    try {
      const res = await api.post(`board`, board, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      alert('게시글 등록 성공');
      navigate(-1);
      console.log(res);
    } catch (e) {
      if (e?.response?.data?.msg) {
        alert(e?.response?.data?.msg);
      }
      console.log(e?.response);
    }
  };
  return (
    <div>
      <div style={{ paddigBottom: '20px' }}>
        <TopBar text={'게시판 등록하기'} />
      </div>
      <UploadTopStyle>
        <Button onClick={uploadBoard}>등록</Button>
      </UploadTopStyle>
      <div style={{}}>
        <UploadSubContentStyle>
          <div>
            <p>제목</p>
            <input
              onChange={handleChange('title')}
              placeholder='제목을 입력해주세요'
            />
          </div>
        </UploadSubContentStyle>
        <UploadSubContentStyle>
          <div>
            <p>내용</p>
            <textarea
              onChange={handleChange('content')}
              placeholder='내용을 입력해주세요'
            ></textarea>
          </div>
        </UploadSubContentStyle>
      </div>
    </div>
  );
};

export default BoardUpload;
