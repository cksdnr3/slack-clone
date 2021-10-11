import React, { useCallback, useState, VFC } from 'react';
import Loading from '@components/Loading';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect, Route, Switch, useLocation } from 'react-router';
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
  ProfileModal,
  LogOutButton,
  WorkspaceButton,
  AddButton,
  WorkspaceModal,
  WorkspaceModalTop,
} from '@layouts/Workspace/styles';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import Menu from '@components/Menu';
import { Link } from 'react-router-dom';
import { IUser } from '@typings/db';
import Modal from '@components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateChannelForm from '@components/CreateChannelForm';
import CreateWorkspaceForm from '@components/CreateWorkspaceForm';
import Separator from '@components/Separator';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

interface WorkspaceProps {}

const Workspace: VFC<WorkspaceProps> = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const location = useLocation();
  const currentWorkspace = location.pathname.split('/')[2];

  const { mutate } = useSWRConfig();
  const { data: user, error, isValidating } = useSWR<IUser>(apiKeys.users, fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(apiKeys.users, false, false);
      });
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal((prev) => !prev);
  }, []);

  const toggleWorkspaceMenu = useCallback(() => {
    setShowWorkspaceMenu((prev) => !prev);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowAddChannelModal((prev) => !prev);
  }, []);

  return (
    <div>
      {isValidating ? (
        <Loading />
      ) : (
        <>
          {!user && <Redirect to="/login" />}
          <Header>
            <RightMenu>
              <span onClick={onClickUserProfile}>
                <ProfileImg src={gravatar.url(user!.nickname, { s: '29px', d: 'retro' })} alt={user?.nickname} />
                {showUserMenu && (
                  <Menu style={{ top: 38, right: 0 }} show={showUserMenu} onCloseMenu={onClickUserProfile}>
                    <ProfileModal>
                      <img
                        src={gravatar.url(user!.nickname, { s: '29px', d: 'retro' })}
                        alt={user?.nickname}
                        style={{ height: 36, width: 36 }}
                      />
                      <div style={{ lineHeight: '1.23463' }}>
                        <span id="profile-name">{user?.nickname}</span>
                        <span id="profile-active">Active</span>
                      </div>
                    </ProfileModal>
                    <LogOutButton onClick={onLogout}>logout</LogOutButton>
                  </Menu>
                )}
              </span>
            </RightMenu>
          </Header>
          <WorkspaceWrapper>
            <Workspaces>
              {user?.Workspaces.map((workspace) => {
                return (
                  <Link key={workspace.id} to={`/workspace/${workspace.name}/channel/일반`}>
                    <WorkspaceButton>{workspace.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                  </Link>
                );
              })}
              <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
            </Workspaces>
            <Channels>
              <WorkspaceName onClick={toggleWorkspaceMenu}>{currentWorkspace}</WorkspaceName>
              <MenuScroll>
                <span onClick={toggleWorkspaceMenu}>
                  <Menu show={showWorkspaceMenu} onCloseMenu={toggleWorkspaceMenu} style={{ top: 102, left: 80 }}>
                    <WorkspaceModal>
                      <WorkspaceModalTop>
                        <WorkspaceButton style={{ margin: 0 }}>
                          {currentWorkspace.slice(0, 1).toUpperCase()}
                        </WorkspaceButton>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '10px',
                            fontSize: '13px',
                            lineHeight: '1.38463',
                          }}
                        >
                          <div style={{ margin: 0, fontWeight: 900 }}>{currentWorkspace}</div>
                          <div>{user?.email}</div>
                        </div>
                      </WorkspaceModalTop>
                      <Separator />
                      <button onClick={onClickAddChannel}>채널 생성</button>
                      <Separator />
                      <button onClick={onLogout}>{currentWorkspace}에서 로그아웃</button>
                    </WorkspaceModal>
                  </Menu>
                </span>
              </MenuScroll>
            </Channels>
            <Chats>
              <Switch>
                <Route path="/workspace/channel/" component={Channel} />
                <Route path="/workspace/dm/" component={DirectMessage} />
              </Switch>
            </Chats>
          </WorkspaceWrapper>
          <Modal show={showCreateWorkspaceModal} onCloseModal={onClickCreateWorkspace}>
            <CreateWorkspaceForm onCloseModal={onClickCreateWorkspace} />
          </Modal>
          <Modal show={showAddChannelModal} onCloseModal={onClickAddChannel}>
            <CreateChannelForm />
          </Modal>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default Workspace;
