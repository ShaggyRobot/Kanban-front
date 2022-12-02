import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

function ModalComponent(props: {
  open: boolean;
  children: JSX.Element;
  setOpen: (open: boolean) => void;
}): JSX.Element {
  const { open, setOpen, children } = props;
  const handleClose = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    (evt.target as HTMLElement).classList.contains('close') && setOpen(false);
  };

  const overlayKf = keyframes`
  from {
    opacity: 0;
    backdrop-filter: blur(0px) sepia(0);
  }

  to {
    opacity: 1;
    backdrop-filter: blur(2px) sepia(0.2);
  }
  `;

  const contentKf = keyframes`
  0% {
    transform: scaleX(10) scaleY(0.1);
  }

  60% {
    transform: scaleX(1) scaleY(0.01);
  }

  100% {
    transform: scaleX(1) scaleY(1);
  }
  `;

  const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: ${open ? 'flex' : 'none'};
    backdrop-filter: blur(2px) sepia(0.2);
    animation: ${overlayKf} 0.3s;
    background-color: #000000ba;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 2000;
    overflow-y: auto;
    overflow-x: hidden;
    cusor: default;
  `;

  const Content = styled.div`
    z-index: 2010;
    animation: ${contentKf} 0.3s cubic-bezier(0.53, 0.76, 0.46, 1.32);
  `;

  return (
    <Overlay onClick={(e) => handleClose(e)} className="close">
      <Content className="content">{children}</Content>
    </Overlay>
  );
}
export { ModalComponent };
