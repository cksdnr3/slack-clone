import React, { CSSProperties, FC, MouseEvent, useCallback } from 'react';
import { CloseModalButton, CreateMenu } from './styles';

interface MenuProps {
  show: boolean;
  style: CSSProperties;
  onCloseMenu?: () => void;
}

const Menu: FC<MenuProps> = ({ children, show, style, onCloseMenu }) => {
  const stopPropagation = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <CreateMenu onClick={onCloseMenu}>
      <div style={style} onClick={stopPropagation}>
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
