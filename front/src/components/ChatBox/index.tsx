import { faLaugh } from '@fortawesome/free-regular-svg-icons';
import {
  faAt,
  faBold,
  faBolt,
  faCode,
  faCodeBranch,
  faEllipsisH,
  faFont,
  faItalic,
  faLink,
  faListOl,
  faListUl,
  faPaperclip,
  faPaperPlane,
  faQuoteLeft,
  faStream,
  faStrikethrough,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { KeyboardEvent, useCallback, useEffect, useRef, useState, VFC } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import autosize from 'autosize';
import {
  Bolt,
  ChatArea,
  Emoji,
  FileClip,
  Form,
  Formatter,
  MentionsTextarea,
  SendButton,
  Suffix,
  Tool,
  Toolbox,
} from './styles';
import { css } from '@emotion/react';

interface ChatBoxProps {
  chat: string;
  onChangeChat: (e: any) => void;
  onSubmit: (e: any) => void;
}

const ChatBox: VFC<ChatBoxProps> = ({ chat, onChangeChat, onSubmit }) => {
  const { workspace } = useParams<{ workspace: string }>();
  const [textFocuse, setTextFocus] = useState(false);
  const { data: user } = useSWR<IUser>('/api/users', fetcher, { dedupingInterval: 2000 });
  const { data: members } = useSWR<IUser[]>(`/api/workspaces/${workspace}/members`, fetcher);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);
  const onKeyDownChat = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  }, []);

  const onFocusTexarea = useCallback(() => {
    console.log('focus');
    setTextFocus(true);
  }, []);

  return (
    <>
      <ChatArea
        onBlur={() => {
          setTextFocus(false);
        }}
      >
        <Form onSubmit={onSubmit}>
          <MentionsTextarea
            placeholder={`에게 메시지 보내기`}
            value={chat}
            onFocus={onFocusTexarea}
            onChange={onChangeChat}
            onKeyDown={onKeyDownChat}
            ref={textareaRef}
          />

          <Toolbox onFocus={onFocusTexarea} textFocus={textFocuse}>
            <Formatter>
              <Tool
                css={css`
                  &:hover {
                    &::after {
                      border-right: 1px solid transparent;
                    }
                  }
                  &::after {
                    border-right: 1px solid rgb(211, 211, 211);
                    content: '';
                  }
                `}
              >
                <Bolt type="button">
                  <FontAwesomeIcon icon={faBolt} />
                </Bolt>
              </Tool>
              <Tool>
                <Emoji type="button" style={{ marginLeft: '4px' }}>
                  <FontAwesomeIcon icon={faBold} style={{ color: 'gray' }} />
                </Emoji>
              </Tool>
              <Tool>
                <Emoji type="button">
                  <FontAwesomeIcon icon={faItalic} style={{ color: 'gray' }} />
                </Emoji>
              </Tool>
              <Tool>
                <Emoji type="button">
                  <FontAwesomeIcon icon={faStrikethrough} style={{ color: 'gray' }} />
                </Emoji>
              </Tool>
              <Tool>
                <Emoji type="button">
                  <FontAwesomeIcon icon={faCode} style={{ color: 'gray' }} />
                </Emoji>
              </Tool>
              <Tool>
                <FileClip type="button">
                  <FontAwesomeIcon icon={faLink} style={{ background: 'transparent', color: 'gray' }} />
                </FileClip>
              </Tool>
              <Tool>
                <FileClip type="button">
                  <FontAwesomeIcon icon={faListOl} style={{ background: 'transparent', color: 'gray' }} />
                </FileClip>
              </Tool>
              <Tool>
                <FileClip type="button">
                  <FontAwesomeIcon icon={faListUl} style={{ background: 'transparent', color: 'gray' }} />
                </FileClip>
              </Tool>
              <Tool>
                <FileClip type="button">
                  <FontAwesomeIcon icon={faStream} style={{ background: 'transparent', color: 'gray' }} />
                </FileClip>
              </Tool>
              <Tool>
                <FileClip type="button">
                  <FontAwesomeIcon icon={faCodeBranch} style={{ background: 'transparent', color: 'gray' }} />
                </FileClip>
              </Tool>
            </Formatter>
            <Suffix>
              <Tool>
                <Emoji type="button">
                  <FontAwesomeIcon icon={faFont} style={{ color: 'gray' }} />
                </Emoji>
              </Tool>

              <Tool>
                <Emoji type="button">
                  <FontAwesomeIcon icon={faAt} style={{ color: 'gray' }} />
                </Emoji>
              </Tool>
              <Tool>
                <Emoji type="button">
                  <FontAwesomeIcon icon={faLaugh} style={{ color: 'gray' }} />
                </Emoji>
              </Tool>
              <Tool>
                <Emoji type="button">
                  <FontAwesomeIcon icon={faPaperclip} style={{ color: 'gray' }} />
                </Emoji>
              </Tool>
              <Tool>
                <SendButton type="submit" disabled={!chat.trim()}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </SendButton>
              </Tool>
            </Suffix>
          </Toolbox>
        </Form>
      </ChatArea>
    </>
  );
};

export default ChatBox;
