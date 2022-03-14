import React, { useCallback, useState } from 'react';
import ChannelList from '@components/ChannelList';
import CreateChannelForm from '@components/CreateChannelForm';
import CreateWorkspaceForm from '@components/CreateWorkspaceForm';
import DMList from '@components/DMList';
import InviteWorkspaceForm from '@components/InviteWorkspaceForm';
import Menu from '@components/Menu';
import Modal from '@components/Modal';
import Separator from '@components/Separator';
import { faAngleDown, faEdit, faLink, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { NavLink, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { LinkWrap, AddButton } from '../contents/styles';
import {
  Workspaces,
  WorkspaceButton,
  Channels,
  WorkspaceName,
  MenuScroll,
  WorkspaceModal,
  WorkspaceModalTop,
} from './style';

const SideBar = () => {
  const { workspace } = useParams<{ workspace: string }>();

  const { data: user, isValidating: isUsersValidating, mutate } = useSWR<IUser>('/api/users', fetcher);
  const { data: channels } = useSWR<IChannel[]>(`/api/workspaces/${workspace}/channels`, fetcher);

  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [showInviteWorkspace, setShowInviteWorkspace] = useState(false);

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
    <>
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
          <div>
            {workspace}
            <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: '8px', fontSize: '15px' }} />
          </div>
          <FontAwesomeIcon
            icon={faEdit}
            style={{
              marginRight: '18px',
              background: 'white',
              color: '#3f0e40',
              padding: '9px 10px',
              width: '36px',
              height: '36px',
              borderRadius: '100px',
              zIndex: 100,
            }}
          />
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
                {/* <button onClick={onLogout}>{workspace}에서 로그아웃</button> */}
              </WorkspaceModal>
            </Menu>
          </span>
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
          <ChannelList user={user} />
          <DMList user={user} />
        </MenuScroll>
      </Channels>
      <Modal show={showCreateWorkspaceModal} onCloseModal={onClickCreateWorkspace}>
        <CreateWorkspaceForm onCloseModal={onClickCreateWorkspace} />
      </Modal>
      <Modal show={showAddChannelModal} onCloseModal={onClickAddChannel}>
        <CreateChannelForm onCloseModal={onClickAddChannel} />
      </Modal>
      <Modal show={showInviteWorkspace} onCloseModal={onClickInviteWorkspace}>
        <InviteWorkspaceForm onCloseModal={onClickInviteWorkspace} />
      </Modal>
    </>
  );
};

export default SideBar;
