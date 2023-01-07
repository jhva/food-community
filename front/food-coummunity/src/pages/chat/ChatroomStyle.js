import { blue, red } from '@mui/material/colors';
import styled from 'styled-components';

export const ChatConatiner = styled.div`
  width: 100%;
  padding-bottom: 90px;
  scroll-behavior: smooth;

  /* display: flex;

  flex-direction: column; */
  overflow: auto;
  height: 100%;
`;
export const ChatContainerText = styled.div`
  /* text-align: left; */
  display: flex;
  flex-direction: column;
`;

export const Msg = styled.div`
  text-align: ${(props) => {
    return props.hasUser === true ? 'right' : 'left';
  }};
  padding: 10px 0px;
`;
export const ChatTextBox = styled.div`
  height: 43px;
`;
export const ChatRootContainer = styled.div`
  width: 100%;
  height: 100vh;

  position: relative;
`;
export const ChatFooter = styled.div`
  width: 100%;
  height: 80px; /* 내용물에 따라 알맞는 값 설정 */
  bottom: 0px;
  position: absolute;
  display: flex;
  div {
    flex: 1;
  }
  input {
    width: 100%;
  }
`;

export const SubmintButton = styled.button`
  :disabled {
    background-color: #fff978;
    /* font-weight: bold; */
  }
  width: 200px;
`;
