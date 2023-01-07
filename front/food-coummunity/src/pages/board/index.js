import { CustomMdOutlineArrowBackIosNew } from 'components/button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootStyle, TopContainerStyle, Button } from './boardStyle';
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

const Board = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
        <TopContainerStyle>
          <CustomMdOutlineArrowBackIosNew
            style={{ marginLeft: '10px' }}
            onClick={() => {
              navigate(-1);
            }}
          />
          <h3>게시판 </h3>
        </TopContainerStyle>
      </div>
      <RootStyle>
        <Button>게시글 작성</Button>
      </RootStyle>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                {['제목', '내용', '작성 시간', '작성자(닉네임)'].map(
                  (item, index) => {
                    return <TableCell key={index}>{item}</TableCell>;
                  }
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {resData?.map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row?.title}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row?.content}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {dayjs(row?.createdAt).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row?.User?.nickname}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Board;

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
