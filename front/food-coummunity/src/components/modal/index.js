import { useCallback } from 'react';
import styled from 'styled-components';
import { ModalBackdrop } from './commonStyle';

const CommonModal = ({ children, onClick }) => {
  return (
    <ModalBackdrop onClick={onClick}>
      <BoxContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </BoxContainer>
    </ModalBackdrop>
  );
};
export { CommonModal };
const BoxContainer = styled.div`
  width: 500px;
  height: 667px;
  padding: 20px;
  background-color: white;
`;
