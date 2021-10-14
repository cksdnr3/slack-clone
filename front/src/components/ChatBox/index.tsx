import { faLaugh } from '@fortawesome/free-regular-svg-icons';
import { faAt, faFont, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { KeyboardEvent, useCallback, useEffect, useRef, useState, VFC } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import autosize from 'autosize';
import { ChatArea, Emoji, FileClip, Form, MentionsTextarea, SendButton, Suffix, Tool, Toolbox } from './styles';
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
            <div></div>
            <Suffix>
              <Tool>
                <Emoji>
                  <FontAwesomeIcon icon={faFont} style={{ color: 'gray' }} />
                </Emoji>
              </Tool>
              <Tool>
                <Emoji>
                  <FontAwesomeIcon icon={faAt} style={{ color: 'gray' }} />
                </Emoji>
              </Tool>
              <Tool>
                <Emoji>
                  <FontAwesomeIcon icon={faLaugh} style={{ color: 'gray' }} />
                </Emoji>
              </Tool>
              <Tool>
                <FileClip>
                  <FontAwesomeIcon icon={faPaperclip} style={{ background: 'transparent', color: 'gray' }} />
                </FileClip>
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
