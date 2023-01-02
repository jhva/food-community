import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Box = styled.div`
  width: 100%;
  height: 90px;
  background-color: ${(props) => props.COLOR[props.COLORNAME[props.INDEX]]};
  cursor: pointer;
  p {
    margin-top: 10px;
    font-weight: bold;
  }
  :hover {
    transition: 1s;
    background: white;
  }
`;

export const TopContainerStyle = styled.div`
  margin-left: 30px;
  display: flex;
  width: 100%;
  align-items: center;
  h3 {
    margin-left: 30px;
  }
`;
