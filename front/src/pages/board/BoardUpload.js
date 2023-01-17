import api from 'api/api';
import TopBar from 'components/TopBar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  RootStyle,
  UploadSubContentStyle,
  UploadTopStyle,
} from './boardStyle';

const BoardUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = useSelector((state) => state?.auth);
  const params = useParams();
  let type = location?.state?.type === '수정';
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  }, [user]);

  const [board, setBoard] = useState({
    title: location?.state ? location?.state?.getData?.title : '',
    content: location?.state ? location?.state?.getData?.content : '',
  });

  const handleChange = (type) => (e) => {
    setBoard({ ...board, [type]: e.target.value });
  };

  const uploadBoard = async () => {
    let locationAPI = type ? api.patch : api.post;
    let body = {
      title: board.title,
      content: board.content,
      username: user?.username,
    };
    try {
      const res = await locationAPI(
        type ? `board/${params?.id}` : `board`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      alert(type ? '게시글 수정 성공' : '게시글 등록 성공');
      navigate(type ? '/board' : -1);
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
        <TopBar text={type ? '게시글 수정' : '게시글 등록'} />
      </div>
      <UploadTopStyle>
        <Button onClick={uploadBoard}>
          {type ? '게시글 수정' : '게시글 등록'}
        </Button>
      </UploadTopStyle>
      <div style={{}}>
        <UploadSubContentStyle>
          <div>
            <p>제목</p>
            <input
              value={board?.title}
              onChange={handleChange('title')}
              placeholder='제목을 입력해주세요'
            />
          </div>
        </UploadSubContentStyle>
        <UploadSubContentStyle>
          <p>내용</p>
          <textarea
            value={board?.content}
            onChange={handleChange('content')}
            placeholder='내용을 입력해주세요'
          />
        </UploadSubContentStyle>
      </div>
    </div>
  );
};

export default BoardUpload;
