import { CloseModalButton } from '@components/Menu/styles';
import React, { FC, MouseEvent, useCallback } from 'react';
import { CreateModal } from './styles';

interface ModalProps {
  show: boolean;
  onCloseModal: () => void;
}

const Modal: FC<ModalProps> = ({ show, onCloseModal, children }) => {
  const stopPropagation = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>{children}</div>
    </CreateModal>
  );
};

export default Modal;
