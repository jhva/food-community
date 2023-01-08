import { CustomMdOutlineArrowBackIosNew } from 'components/button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RootStyle,
  TopContainerStyle,
  Button,
  NullableStyle,
} from './boardStyle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import api from 'api/api';
import dayjs from 'dayjs';
import PageNation from '../../components/pagenation/index';
import TopBar from 'components/TopBar';

const Board = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const perpage = 5;

  const [resData, setResData] = useState([]);
  const getBoard = async () => {
    try {
      const res = await api.get(`/board`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      setResData(res?.data?.data);
    } catch (e) {
      if (e?.response?.data?.msg) {
        alert(e?.response?.data?.msg);
      }
      console.log(e?.response);
    }
  };
  useEffect(() => {
    getBoard();
  }, []);
  return (
    <>
      <div style={{ paddigBottom: '20px' }}>
        <TopBar text={'게시판'} />
      </div>
      <div>
        <RootStyle>
          <Button
            onClick={() => {
              navigate('/boardUpload');
            }}
          >
            게시글 등록
          </Button>
        </RootStyle>

        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                {header?.map((item, index) => {
                  return <TableCell key={index}>{item}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            {resData
              .slice((page - 1) * perpage, (page - 1) * perpage + perpage)
              .map((row, key) => (
                <TableBody key={key}>
                  <TableRow
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/boardContent/${row.id}`, { state: row });
                    }}
                    key={row?.id}
                  >
                    <TableCell component='th' scope='row'>
                      {row?.title}
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {dayjs(row?.createdAt).format('YYYY-MM-DD')}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row?.User?.nickname}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
          {resData?.length === 0 && (
            <NullableStyle>
              <p>현재 게시물이 존재하지 않습니다</p>
            </NullableStyle>
          )}
        </TableContainer>

        <PageNation
          perpage={perpage}
          page={page}
          setPage={setPage}
          data={resData}
        />
      </div>
    </>
  );
};

export default Board;

let header = ['제목', '작성 시간', '작성자(닉네임)'];
