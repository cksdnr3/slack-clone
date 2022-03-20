import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { themeLib } from '@styles/themeLib';
import { BtnColor, BtnSize } from '.';

const color = (color?: BtnColor) => {
  switch (color) {
    case 'gray': {
      return css`
        background-color: rgba(var(--sk_foreground_low_solid, 221, 221, 221), 0.7);
        color: rgba(var(--sk_primary_foreground, 29, 28, 29), 0.75);
        border-color: rgba(var(--sk_foreground_low_solid, 221, 221, 221), 1);

        &:hover {
          background: rgba(var(--sk_foreground_low_solid, 221, 221, 221), 1);
        }
      `;
    }
    case 'purple': {
      return css`
        background-color: rgb(${themeLib.main.backgroundColor});
        color: rgb(${themeLib.palette.white[100]});

        &:hover {
          background: rgba(${themeLib.main.backgroundColor}, 0.7);
        }
      `;
    }
    default: {
      break;
    }
  }
};

const size = (size?: BtnSize) => {
  switch (size) {
    case 'small': {
      return css`
        width: 20%;
      `;
    }
    case 'medium': {
      return css`
        width: 50%;
      `;
    }
    case 'large': {
      return css`
        width: 100%;
      `;
    }
    default: {
      break;
    }
  }
};

export namespace ButtonStyle {
  export const Wrapper = styled.button<{ btnColor?: BtnColor; btnSize?: BtnSize }>`
    ${({ btnColor, btnSize }) => `
    ${color(btnColor)?.styles};
    ${size(btnSize)?.styles};
    `}
    outline: none;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    text-align: center;
    white-space: nowrap;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    font-size: 15px;
    height: 36px;
    min-width: 80px;
    padding: 0 12px 1px;
    text-shadow: none;
    background-clip: initial;
    box-shadow: none;
    font-weight: bold;
  `;
}
