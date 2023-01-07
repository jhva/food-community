import styled from 'styled-components';
const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999999999999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export { ModalBackdrop };
