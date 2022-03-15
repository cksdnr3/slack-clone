import { CloseModalButton } from '@components/Menu/styles';
import React, { CSSProperties, FC, MouseEvent, useCallback } from 'react';
import { CreateModal } from './styles';

interface ModalProps {
  show: boolean;
  onCloseModal: () => void;
  style?: CSSProperties;
}

const Modal: FC<ModalProps> = ({ show, onCloseModal, children, style }) => {
  const stopPropagation = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal style={style} onClick={onCloseModal}>
      <div onClick={stopPropagation}>{children}</div>
    </CreateModal>
  );
};

export default Modal;
