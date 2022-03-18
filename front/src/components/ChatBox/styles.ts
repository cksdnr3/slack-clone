import styled from '@emotion/styled';

export const ChatArea = styled.div`
  width: 100%;
  padding: 20px;
  padding-top: 0;
`;

export const Form = styled.form`
  font-size: 15px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(${({ theme }) => theme.palette.white[900]});
`;

export const MentionsTextarea = styled.textarea`
  display: flex;
  padding: 8px 9px;
  height: 38px;
  & strong {
    background: skyblue;
  }

  font-size: 15px;
  font-family: Slack-Lato, appleLogo, sans-serif;
  width: 100%;
  outline: none !important;
  border-radius: 4px !important;
  resize: none !important;
  line-height: 22px;
  border: none;

  & ul {
    border: 1px solid lightgray;
    max-height: 200px;
    overflow-y: auto;
    padding: 9px 10px;
    background: white;
    border-radius: 4px;
    width: 150px;
  }
`;

export const Toolbox = styled.div<{ textFocus: boolean }>`
  ${({ theme }) => theme.flexSet({ align: 'center', justify: 'space-between' })};
  position: relative;
  background: rgb(${({ theme }) => theme.palette.white[200]});
  border-top: 1px solid rgb(${({ theme }) => theme.palette.white[300]});
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: opacity 0.2s, border 0.2s;

  ${(props) =>
    !props.textFocus &&
    `
    border-top: 1px solid rgb(${props.theme.palette.white[100]});
    opacity: 0.4;
  `}
`;

export const Suffix = styled.div`
  ${({ theme }) => theme.flexSet({ align: 'center' })};
`;

export const Formatter = styled.div`
  ${({ theme }) => theme.flexSet({ align: 'center' })};
  padding: 0 7px 0 4px;
`;

export const Bolt = styled.button`
  width: 32px;
  height: 32px;
  background: transparent;
  cursor: pointer;
  transition: background 0.1s;
  padding: 0;

  &:hover {
    background: rgb(${({ theme }) => theme.main.hilightColor});
    opacity: 1 !important;
    border-radius: 1px;
    color: rgb(${({ theme }) => theme.palette.white[100]});
  }
`;

export const Emoji = styled.button`
  width: 32px;
  height: 32px;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: rgb(${({ theme }) => theme.palette.white[300]}, 0.3);
    border-radius: 4px;
  }
`;

export const Tool = styled.div`
  margin: 4px 0;
`;

export const SendButton = styled.button`
  height: 32px;
  width: 40px;
  margin: 0 7px 0 9px;
  border-radius: 3px;
  outline: none;
  transition: background 0.2s;

  & > svg {
    color: rgb(${({ theme }) => theme.palette.white[100]});
  }

  ${(props) =>
    props.disabled
      ? `
      background: transparent;
      border: transparent;
      & > svg {
        color: rgb(${props.theme.palette.white[500]});
      }
  `
      : `  
      background: rgb(${props.theme.palette.green[700]});
      border: 1px solid rgb(${props.theme.palette.green[700]});
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }`}
`;

export const FileClip = styled.button`
  background: transparent;
  cursor: pointer;
  width: 32px;
  height: 32px;
  transition: background 0.1s;

  &:hover {
    background: rgb(${({ theme }) => theme.palette.white[300]}, 0.3);
    border-radius: 4px;
  }
`;

export const EachMention = styled.button<{ focus: boolean }>`
  ${({ theme, focus }) => `
    ${theme.flexSet({ align: 'center' })};
    ${
      focus &&
      `
      background: rgb(${theme.main.hilightColor});
      color: white;
    `
    }
  `};
  padding: 4px 20px;
  background: transparent;
  border: none;
  color: rgb(${({ theme }) => theme.palette.white[900]});
  width: 100%;
  & img {
    margin-right: 5px;
  }
`;
