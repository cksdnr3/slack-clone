import React, { useEffect, VFC } from 'react';
import Loading from '@components/Loading';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { IChannel, IUser } from '@typings/db';
import useSocket from '@hooks/useSocket';
import Contents from '@pages/workspace/layouts/contents';
import Header from './layouts/header';
import SideBar from './layouts/sidebar';
import { Navigate, Route, useParams } from 'react-router-dom';

interface WorkspaceProps {}

const Workspace: VFC<WorkspaceProps> = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const [socket, disconnect] = useSocket(workspace);

  const { data: user, isValidating: isUsersValidating } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 1000 * 60 * 60 * 60 * 24 * 7,
  });
  const { data: channels } = useSWR<IChannel[]>(`/api/workspaces/${workspace}/channels`, fetcher);

  useEffect(() => {
    if (channels && user && socket) {
      socket.emit('login', { id: user.id, channels: channels.map((v) => v.id) });
    }
  }, [socket, channels, user]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <SideBar />
        <Contents />
      </div>
    </>
  );
};

export default Workspace;
