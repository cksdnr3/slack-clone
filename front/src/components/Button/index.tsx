import React, { FC, HTMLAttributes } from 'react';
import { ButtonStyle } from './stylest';

export type BtnColor = 'gray' | 'purple';
export type BtnSize = 'small' | 'medium' | 'large';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  color?: BtnColor;
  size?: BtnSize;
}

const Button: FC<IButtonProps> = (props) => {
  return (
    <ButtonStyle.Wrapper
      btnColor={props.color}
      btnSize={props.size}
      {...props}
      type={props.type}
      disabled={props.disabled}
    >
      {props.text}
    </ButtonStyle.Wrapper>
  );
};

export default Button;
