import styled from 'styled-components';

export const CommentRootStyle = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CommentBox = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  margin: 10px;
  div {
    display: flex;
    flex-direction: column;
  }
`;
