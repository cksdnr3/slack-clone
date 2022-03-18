import React, { FC, HTMLAttributes } from 'react';
import { ButtonStyle } from './stylest';

export type BtnColor = 'gray';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text?: string;
  color?: BtnColor;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<IButtonProps> = (props) => {
  return (
    <ButtonStyle.Wrapper btnColor={props.color} {...props} type={props.type}>
      {props.text}
    </ButtonStyle.Wrapper>
  );
};

export default Button;
