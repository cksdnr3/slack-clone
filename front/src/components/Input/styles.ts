import styled from '@emotion/styled';

export namespace InputStyle {
  export const Input = styled.input`
    border-radius: 4px;
    --saf-0: rgba(var(--sk_primary_foreground, 29, 28, 29), 0.3);
    border: 1px solid var(--saf-0);
    transition: border 80ms ease-out, box-shadow 80ms ease-out;
    box-sizing: border-box;
    width: 100%;
    color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
    background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
    padding: 12px;
    height: 44px;
    padding-top: 11px;
    padding-bottom: 13px;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.33333333;
    &:focus {
      --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
      box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
    }
  `;

  export const Label = styled.label`
    & > span {
      display: block;
      text-align: left;
      padding-bottom: 6px;
      font-size: 15px;
      cursor: pointer;
      line-height: 1.46666667;
      font-weight: 700;
    }
  `;
}
