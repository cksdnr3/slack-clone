import React, { useCallback, useState, VFC } from 'react';
import Loading from '@components/Loading';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect, Route, Switch, useParams } from 'react-router';
import useSWR, { useSWRConfig } from 'swr';
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
  LinkWrap,
} from '@layouts/Workspace/styles';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import Menu from '@components/Menu';
import { IChannel, IUser } from '@typings/db';
import Modal from '@components/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateChannelForm from '@components/CreateChannelForm';
import CreateWorkspaceForm from '@components/CreateWorkspaceForm';
import Separator from '@components/Separator';
import InviteWorkspaceForm from '@components/InviteWorkspaceForm';
import InviteChannelForm from '@components/InviteChannelForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ChannelList from '@components/ChannelList';
import DMList from '@components/DMList';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

interface WorkspaceProps {}
const Workspace: VFC<WorkspaceProps> = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [showInviteWorkspace, setShowInviteWorkspace] = useState(false);
  const { workspace } = useParams<{ workspace: string }>();

  const { mutate } = useSWRConfig();
  const { data: user, isValidating: isUsersValidating } = useSWR<IUser>('/api/users', fetcher);
  const { data: channels } = useSWR<IChannel[]>(`/api/workspaces/${encodeURIComponent(workspace)}/channels`, fetcher);
  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate('/api/users', false, false);
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
    onCloseWorkspaceMenu();
  }, []);

  const onCloseWorkspaceMenu = useCallback(() => {
    setShowWorkspaceMenu(false);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspace((prev) => !prev);
    onCloseWorkspaceMenu();
  }, []);

  return (
    <div>
      {isUsersValidating ? (
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
              {user?.Workspaces.map((ws) => {
                return (
                  <LinkWrap key={ws.id} to={`/workspace/${ws.name}/channel/일반`} select={`${ws.name === workspace}`}>
                    <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                  </LinkWrap>
                );
              })}
              <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
            </Workspaces>
            <Channels>
              <WorkspaceName onClick={toggleWorkspaceMenu}>
                {workspace}
                <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: '8px', fontSize: '15px' }} />
              </WorkspaceName>
              <MenuScroll>
                <span onClick={toggleWorkspaceMenu}>
                  <Menu show={showWorkspaceMenu} onCloseMenu={toggleWorkspaceMenu} style={{ top: 102, left: 80 }}>
                    <WorkspaceModal>
                      <WorkspaceModalTop>
                        <WorkspaceButton style={{ margin: 0, border: 'none', borderRadius: '3px', cursor: 'default' }}>
                          {workspace.slice(0, 1).toUpperCase()}
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
                          <div style={{ margin: 0, fontWeight: 900 }}>{workspace}</div>
                          <div>{user?.email}</div>
                        </div>
                      </WorkspaceModalTop>
                      <Separator />
                      <button onClick={onClickAddChannel}>채널 생성</button>
                      <button onClick={onClickInviteWorkspace}>{workspace}에 사용자 초대</button>
                      <Separator />
                      <button onClick={onLogout}>{workspace}에서 로그아웃</button>
                    </WorkspaceModal>
                  </Menu>
                </span>
                <ChannelList user={user} />
                <DMList user={user} />
              </MenuScroll>
            </Channels>
            <Chats>
              <Switch>
                <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
                <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
              </Switch>
            </Chats>
          </WorkspaceWrapper>
          <Modal show={showCreateWorkspaceModal} onCloseModal={onClickCreateWorkspace}>
            <CreateWorkspaceForm onCloseModal={onClickCreateWorkspace} />
          </Modal>
          <Modal show={showAddChannelModal} onCloseModal={onClickAddChannel}>
            <CreateChannelForm onCloseModal={onClickAddChannel} />
          </Modal>
          <Modal show={showInviteWorkspace} onCloseModal={onClickInviteWorkspace}>
            <InviteWorkspaceForm onCloseModal={onClickInviteWorkspace} />
          </Modal>

          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default Workspace;
