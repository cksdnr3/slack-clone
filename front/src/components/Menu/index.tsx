import React, { CSSProperties, FC, MouseEvent, useCallback } from 'react';
import { CloseModalButton, CreateMenu } from './styles';

interface MenuProps {
  show: boolean;
  style: CSSProperties;
  onCloseMenu?: () => void;
  closeButton?: boolean;
}

const Menu: FC<MenuProps> = ({ children, show, style, onCloseMenu, closeButton }) => {
  const stopPropagation = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <CreateMenu>
      <div style={style} onClick={stopPropagation}>
        {children}
      </div>
    </CreateMenu>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
