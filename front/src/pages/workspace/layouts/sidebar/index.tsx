import React, { useCallback, useState } from 'react';
import PublicChannelList from '@pages/workspace/components/PublicChannelList';
import PrivateChannelList from '@pages/workspace/components/PrivateChannelList';
import { faLink, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { NavLink, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Channels, MenuScroll } from './style';
import WorkspaceInfo from '@pages/workspace/components/WorkspaceInfo';
import Workspaces from '@pages/workspace/components/Workspaces';

const SideBar = () => {
  const { workspace } = useParams<{ workspace: string }>();

  const { data: user, isValidating: isUsersValidating, mutate } = useSWR<IUser>('/api/users', fetcher);
  const { data: channels } = useSWR<IChannel[]>(`/api/workspaces/${workspace}/channels`, fetcher);

  return (
    <>
      <Workspaces />
      <Channels>
        <WorkspaceInfo />
        <MenuScroll>
          <NavLink
            style={{ paddingLeft: 16, marginTop: 10 }}
            activeClassName="selected"
            to={`/workspace/${workspace}/slack-connect`}
            activeStyle={{
              background: 'rgb(0, 103, 163)',
            }}
          >
            <FontAwesomeIcon icon={faLink} style={{ marginRight: '5px' }} />
            <span>Slack Connect</span>
          </NavLink>
          <div style={{ paddingLeft: 16, marginTop: 10 }}>
            <FontAwesomeIcon icon={faEllipsisV} style={{ marginRight: '10px' }} />
            <span>Slack 찾아보기</span>
          </div>
          <PublicChannelList user={user} />
          <PrivateChannelList user={user} />
        </MenuScroll>
      </Channels>
    </>
  );
};

export default SideBar;
