import api from 'api/api';
import TopBar from 'components/TopBar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CommentBox, CommentRootStyle } from './boardDetailStyle';
import {
  Button,
  ButtonStyle,
  UploadSubContentStyle,
  UploadTopStyle,
} from './boardStyle';

const BoardDetail = () => {
  let text = '수정';
  const { token, user } = useSelector((state) => state.auth);
  const [getData, setGetData] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [commentData, setCommentData] = useState({
    content: '',
  });
  const params = useParams();
  useEffect(() => {
    if (!location?.state) {
      alert('/');
      return;
    }
  }, [location]);
  const handleChange = (type) => (e) => {
    if (e.target.value === ' ') {
      alert('띄워쓰기를 제외하고 입력해주세요');
      return;
    }
    setCommentData({ ...commentData, [type]: e.target.value });
  };
  const detailGetBoard = async () => {
    try {
      const res = await api.get(`board/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      setGetData(res?.data?.data[0]);
    } catch (e) {
      if (e?.response?.data?.msg) {
        alert(e?.response?.data?.msg);
      }
      console.log(e?.response);
    }
  };
  const postComment = async () => {
    try {
      const res = await api.post(`comment/${params.id}`, commentData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      alert('댓글 등록 성공');
      setCommentData({ ...commentData, content: '' });
    } catch (e) {
      if (e?.response?.data?.msg) {
        alert(e?.response?.data?.msg);
      }
      console.log(e?.response);
    }
  };
  const deleteBoard = async () => {
    try {
      const res = await api.delete(`board/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      navigate(-1);
      alert('게시물이 성공적으로 삭제되었습니다.');
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

  const renderBox = () => {
    return (
      <CommentBox>
        <div>
          <p>닉네임: {getData?.User?.nickname}</p>
          <p>댓글: {getData?.content}</p>
        </div>
      </CommentBox>
    );
  };
  return (
    <div>
      <div style={{ paddigBottom: '20px' }}>
        <TopBar text={`${location?.state?.title}`} />
      </div>
      <UploadTopStyle>
        {user?.id === getData?.UserId ? (
          <div>
            <Button onClick={deleteBoard} style={{ background: '#F5A9A9' }}>
              삭제
            </Button>
            <Button
              onClick={() => {
                navigate(`/boardUpload/${params.id}`, {
                  state: {
                    getData,
                    type: text,
                  },
                });
              }}
            >
              {text}
            </Button>
          </div>
        ) : null}
      </UploadTopStyle>
      <div style={{}}>
        <UploadSubContentStyle>
          <div>
            <p>제목</p>
            <input value={getData?.title} />
          </div>
        </UploadSubContentStyle>
        <UploadSubContentStyle>
          <div>
            <p>내용</p>
            <textarea value={getData?.content}></textarea>
          </div>
        </UploadSubContentStyle>
        <div>
          <UploadSubContentStyle>
            <div>
              <p>댓글등록하기</p>
              <textarea
                onChange={handleChange('content')}
                value={commentData?.content}
              />
              <button
                form='comment-btn'
                type='submit'
                onClick={() => {
                  postComment();
                }}
                style={{ minWidth: '300px', background: '#E6E6E6' }}
              >
                댓글 등록
              </button>
            </div>
          </UploadSubContentStyle>
          <UploadSubContentStyle>
            <CommentRootStyle style={{}}>
              {getData?.Comments?.map((item) => {
                return (
                  <CommentBox>
                    <div>
                      <p>닉네임: {item?.User?.nickname}</p>
                      <p>댓글: {item?.content}</p>
                    </div>
                  </CommentBox>
                );
              })}
            </CommentRootStyle>
          </UploadSubContentStyle>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
