import styled from '@emotion/styled';

export const CollapseButton = styled.button<{ collapse: boolean }>`
  background: transparent;
  margin-right: 11px;
  border: none;
  padding: 0;
  color: rgb(188, 171, 188);
  cursor: pointer;

  ${({ collapse }) =>
    collapse
      ? `
    & svg {
      transition: all ease 0.1s;
      transform: rotate( -90deg );
    }
  `
      : `
      
  & svg {
    transition: all ease 0.1s;
    transform: rotate( 0 );
  }
`};
`;

export const HoverWhite = styled.div<{ collapse: boolean }>`
  & > h2,
  & > h2 > button {
    color: ${(props) => !props.collapse && 'white'};
  }
  & > h2:hover,
  & > a:hover {
    color: white;

    & > button {
      color: white;
    }
  }

  & > a:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;

export const CollaptedChannels = styled.div``;
