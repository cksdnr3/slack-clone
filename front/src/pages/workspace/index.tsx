import React, { useEffect, VFC } from 'react';
import Loading from '@components/Loading';
import fetcher from '@utils/fetcher';
import { Redirect, useParams } from 'react-router';
import useSWR from 'swr';
import { IChannel, IUser } from '@typings/db';
import useSocket from '@hooks/useSocket';
import Contents from '@pages/workspace/layouts/contents';
import Header from './layouts/header';
import SideBar from './layouts/side_bar';

interface WorkspaceProps {}

const Workspace: VFC<WorkspaceProps> = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const [socket, disconnect] = useSocket(workspace);

  const { data: user, isValidating: isUsersValidating } = useSWR<IUser>('/api/users', fetcher);
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
  }, [workspace, disconnect]);

  if (isUsersValidating) {
    return <Loading />;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <SideBar />
        <Contents />
      </div>
    </>
  );
};

export default Workspace;
