import styled from '@emotion/styled';
// import { MentionsInput } from 'react-mentions';

export const ChatArea = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  padding-top: 0;
`;

export const Form = styled.form`
  color: rgb(29, 28, 29);
  font-size: 15px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(29, 28, 29);
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(248, 248, 248);
  border-top: 1px solid rgb(221, 221, 221);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: opacity 0.2s, border 0.2s;

  ${(props) =>
    !props.textFocus &&
    `
    border-top: 1px solid white;
    opacity: 0.4 !important;
  `}
`;

export const Suffix = styled.div`
  display: flex;
  align-items: center;
`;

export const Formatter = styled.div`
  display: flex;
  align-items: center;
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
    background: #1264a3;
    opacity: 1 !important;
    border-radius: 1px;
    color: white;
  }
`;

export const Emoji = styled.button`
  width: 32px;
  height: 32px;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: rgb(221, 221, 221);
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
    color: white;
  }

  ${(props) =>
    props.disabled
      ? `
      background: transparent;
      border: transparent;
      & > svg {
        color: gray;
      }
  `
      : `  
      background: #007a5a;
      border: 1px solid #007a5a;
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
    background: rgb(221, 221, 221);
    border-radius: 4px;
  }
`;

export const EachMention = styled.button<{ focus: boolean }>`
  padding: 4px 20px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: rgb(28, 29, 28);
  width: 100%;
  & img {
    margin-right: 5px;
  }
  ${({ focus }) =>
    focus &&
    `
    background: #1264a3;
    color: white;
  `};
`;
