import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import IconButton from "./IconButton";

const Container = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.6;
`;

const ModalCard = styled.div`
  z-index: 11;
  position: relative;
  margin: auto;
  width: 600px;
  max-width: 90%;
  height: auto;
  background-color: white;
  border-radius: ${({ theme }) => theme.spacer}px;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.spacer * 2}px;
  box-sizing: border-box;

  h1 {
    margin: 0;
    font-size: 18px;
  }
`;

const CloseButton = styled(IconButton)`
  margin-left: auto;
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacer * 2}px;
  padding-top: 0;
  box-sizing: border-box;
`;

function Modal({ open, title, children, onClose = () => {} }: Props) {
  if (open) {
    return ReactDOM.createPortal(
      <Container>
        <Overlay onClick={onClose} />
        <ModalCard>
          <ModalHeader>
            {title && <h1>{title}</h1>}
            <CloseButton icon="times" onClick={onClose} fixedWidth size="lg" />
          </ModalHeader>

          <ModalBody>{children}</ModalBody>
        </ModalCard>
      </Container>,
      document.body
    );
  } else {
    return null;
  }
}

type Props = {
  open?: boolean;
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
};

export default Modal;
