import React, { FC, useCallback, VFC } from 'react';
import Loading from '@components/loading';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect, Route, Switch } from 'react-router';
import useSWR, { useSWRConfig } from 'swr';
import { apiKeys } from '@constants/apiKeys';
import {
  Header,
  ProfileImg,
  RightMenu,
  Workspaces,
  WorkspaceWrapper,
  Channels,
  Chats,
  WorkspaceName,
  MenuScroll,
} from '@layouts/Workspace/styles';
import { User } from '@pages/Login';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import { Link } from 'react-router-dom';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

interface WorkspaceProps {}

const Workspace: VFC<WorkspaceProps> = () => {
  const { mutate } = useSWRConfig();
  const { data, error, isValidating } = useSWR<User>(apiKeys.users, fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then((res) => {
        mutate(apiKeys.users, false, false);
      });
  }, []);

  return (
    <div>
      {isValidating ? (
        <Loading />
      ) : (
        <>
          {!data && <Redirect to="/login" />}
          <Header>
            <RightMenu>
              <span>
                <ProfileImg src={gravatar.url(data!.nickname, { s: '29px', d: 'retro' })} alt={data?.nickname} />
              </span>
            </RightMenu>
          </Header>
          <button onClick={onLogout}>logout</button>
          <WorkspaceWrapper>
            <Workspaces>hello</Workspaces>
            <Channels>
              <WorkspaceName>Sleact</WorkspaceName>
              <MenuScroll></MenuScroll>
            </Channels>
            <Chats>
              <Switch>
                <Route path="/workspace/channel/" component={Channel} />
                <Route path="/workspace/dm/" component={DirectMessage} />
              </Switch>
            </Chats>
          </WorkspaceWrapper>
        </>
      )}
    </div>
  );
};

export default Workspace;
