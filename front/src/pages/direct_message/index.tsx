import Loading from '@components/Loading';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { Container, Header } from './styles';
import gravatar from 'gravatar';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const [chat, onChangeChat, setChat] = useInput('');
  const { data: user } = useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: Me } = useSWR<IUser>(`/api/users`, fetcher);

  const onSubmitMessage = useCallback((e: SubmitEvent) => {
    e.preventDefault();
    console.log('submit');
    setChat('');
  }, []);

  return (
    <>
      {!user || !Me ? (
        <Loading />
      ) : (
        <Container>
          <Header>
            <img
              src={gravatar.url(user.email, { s: '27px', d: 'mp' })}
              style={{ borderRadius: '4px' }}
              alt={user.nickname}
            />
            <span>{user.nickname}</span>
          </Header>
          <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmit={onSubmitMessage} />
        </Container>
      )}
    </>
  );
};

export default DirectMessage;
