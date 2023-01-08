import styled from 'styled-components';

export const TopContainerStyle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  h3 {
    margin-left: 30px;
  }
`;

export const RootStyle = styled.div`
  padding: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: right;
`;

export const Button = styled.button`
  width: 200px;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: #6eeaff;
`;

export const NullableStyle = styled.div`
  p {
    font-weight: bold;
  }
  width: 100%;
  margin: 10px 0px;
  text-align: center;
`;
