import React, { FC, HTMLAttributes, ReactElement } from 'react';
import { FormStyle } from './styles';

interface IFormProps extends HTMLAttributes<HTMLFormElement> {
  header: ReactElement;
  body: ReactElement<HTMLInputElement>[];
  footer: ReactElement;
}

const Form: FC<IFormProps> = (props) => {
  return (
    <FormStyle.Wrapper {...props}>
      <FormStyle.Header>{props.header}</FormStyle.Header>
      <FormStyle.Body>{props.body}</FormStyle.Body>
      <FormStyle.Footer>{props.footer}</FormStyle.Footer>
    </FormStyle.Wrapper>
  );
};

export default Form;
