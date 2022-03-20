import React, { ChangeEvent, FC, HTMLAttributes, HTMLInputTypeAttribute, InputHTMLAttributes, useEffect } from 'react';
import { InputStyle } from './styles';

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: React.Dispatch<string>;
  type?: HTMLInputTypeAttribute;
  label?: string;
}

const Input: FC<IInputProps> = (props) => {
  useEffect(() => {
    return () => props.setValue('');
  }, []);
  return (
    <InputStyle.Label>
      <span>{props.label}</span>
      <InputStyle.Input {...props} />
    </InputStyle.Label>
  );
};

export default Input;
