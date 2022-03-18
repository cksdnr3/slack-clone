import Loading from '@components/Loading';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { DirectMessageStyle } from './styles';
import gravatar from 'gravatar';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';

interface DirectMessageProps {}

const DirectMessage: FC<DirectMessageProps> = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const { data: user } = useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: Me } = useSWR<IUser>(`/api/users`, fetcher);

  const { value: chat, onChange: onChangeChat, setValue: setChat } = useInput('');

  const onSubmitMessage = useCallback((e: SubmitEvent) => {
    e.preventDefault();
    setChat('');
  }, []);

  return (
    <DirectMessageStyle.Wrapper>
      <DirectMessageStyle.Header>
        <img
          src={gravatar.url(user?.email || '', { s: '27px', d: 'mp' })}
          style={{ borderRadius: '4px' }}
          alt={user?.nickname}
        />
        <span>{user?.nickname}</span>
      </DirectMessageStyle.Header>
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmit={onSubmitMessage} />
    </DirectMessageStyle.Wrapper>
  );
};

export default DirectMessage;
