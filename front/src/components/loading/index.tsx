import { jsx, keyframes, css } from '@emotion/react';
import React, { VFC } from 'react';
import styled from '@emotion/styled';

interface LoadingProps {
  width?: string;
  height?: string;
}

const Loading: VFC<LoadingProps> = ({ width, height }) => {
  return (
    <Wrapper>
      <svg
        css={css`
          animation: ${Rotate} 3s infinite;
        `}
      >
        <Circle
          css={css`
            animation: ${CircleAnimation} 1s infinite;
          `}
          cx="50%"
          cy="50%"
          r="25"
        ></Circle>
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: 0.5s;
`;

const CircleAnimation = keyframes`
  0% { stroke-dashoffset: 157; }
  75% { stroke-dashoffset: -147; }
  100% { stroke-dashoffset: -157; }
`;

const Circle = styled.circle`
  stroke: black;
  stroke-width: 4;
  stroke-dasharray: 157;
  stroke-dashoffset: 0;
  fill: none;
`;

const Rotate = keyframes`
  100% { transform: rotate(360deg); }
`;

export default Loading;
