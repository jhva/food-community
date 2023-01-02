import { blue, red } from '@mui/material/colors';
import styled from 'styled-components';

export const ChatConatiner = styled.div`
  width: 100%;
  padding-bottom: 90px;
  display: flex;

  flex-direction: column;

  overflow-y: auto;
  height: 100%;
`;
export const ChatText = styled.span``;
export const ChatTextBox = styled.div`
  text-align: ${(props) => {
    return props.hasUser === props.USER ? 'right' : 'left';
  }};
`;
export const ChatRootContainer = styled.div`
  width: 100%;
  height: 100vh;

  position: relative;
`;
export const ChatFooter = styled.div`
  width: 100%;
  height: 90px; /* 내용물에 따라 알맞는 값 설정 */
  bottom: 0px;
  position: absolute;
  display: flex;
  div {
    background-color: blue;

    flex: 1;
  }
  input {
    width: 100%;
  }
  button {
    width: 200px;
  }
`;
