import api from 'api/api';
import { CustomBiTrash } from 'components/button';
import TopBar from 'components/TopBar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  CommentBox,
  CommentContent,
  CommentRootStyle,
} from './boardDetailStyle';
import {
  Button,
  ButtonStyle,
  UploadSubContentStyle,
  UploadTopStyle,
} from './boardStyle';

const BoardDetail = () => {
  let text = '수정';
  const { token, user } = useSelector((state) => state.auth);
  const [getData, setGetData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [commentData, setCommentData] = useState({
    content: '',
  });
  const [getCommentData, setGetCommentData] = useState([]);
  const params = useParams();

  const socket = io(
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_SERVER
      : 'http://localhost:9000',
    {
      transports: ['websocket'],
      query: { roomId: params?.id },
    }
  );
  useEffect(() => {
    if (!location?.state) {
      navigate('/');
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
      setGetCommentData(res?.data?.data[0].Comments);
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
      // alert('댓글 등록 성공');
      socket.emit('board', {
        nickname: user?.nickname,
        userId: user?.id,
        content: commentData.content,
        board: params.id,
      });
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
    socket.on('commentMsg', (item) => {
      setGetCommentData((prev) => {
        let newData = Object.assign([], prev);
        newData.push(item);
        return newData;
      });
    });
    return () => {
      socket.off();
    };
  }, []);
  const deleteComment = async (id, item) => {
    try {
      const res = await api.delete(`comment/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      // alert('댓글 삭제 완료');
      setGetCommentData(getCommentData.filter((data) => data.id !== id));
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
              {getCommentData?.map((item, key) => {
                return (
                  <CommentBox key={key}>
                    <CommentContent>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p>
                          닉네임:
                          {!item?.User?.nickname
                            ? item?.nickname
                            : item?.User?.nickname}
                        </p>
                        <p>댓글: {item?.content}</p>
                      </div>
                      {user?.id !== item.UserId ? null : (
                        <div style={{ flex: 1 }}>
                          <CustomBiTrash
                            onClick={() => {
                              if (user?.id !== item.UserId) {
                                alert('자신이 쓴 댓글만 가능합니다.');
                                return;
                              }
                              deleteComment(item?.id, item);
                            }}
                          />
                        </div>
                      )}
                    </CommentContent>
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
