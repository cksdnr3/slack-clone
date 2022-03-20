import React from 'react';
import PublicChannelList from '@pages/workspace/components/PublicChannelList';
import PrivateChannelList from '@pages/workspace/components/PrivateChannelList';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { SidebarStyle } from './style';
import WorkspaceInfo from '@pages/workspace/components/WorkspaceInfo';
import Workspaces from '@pages/workspace/components/Workspaces';
import DefaultChannelList from '@pages/workspace/components/DefaultChannelList';

const SideBar = () => {
  const { workspace } = useParams<{ workspace: string }>();

  const { data: user, isValidating: isUsersValidating, mutate } = useSWR<IUser>('/api/users', fetcher);
  const { data: channels } = useSWR<IChannel[]>(`/api/workspaces/${workspace}/channels`, fetcher);

  return (
    <>
      <Workspaces />
      <SidebarStyle.Channels>
        <WorkspaceInfo />
        <SidebarStyle.MenuScroll>
          <DefaultChannelList />
          <PublicChannelList user={user} />
          <PrivateChannelList user={user} />
        </SidebarStyle.MenuScroll>
      </SidebarStyle.Channels>
    </>
  );
};

export default SideBar;
