import React, { FC, useEffect } from 'react';
import Menu from '@components/Menu';
import { faAngleDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useToggle from '@hooks/useToggle';
import { useParams } from 'react-router-dom';
import { WorkspaceInfoStyle } from './styles';
import SidebarMenuForm from '../SidebarMenuForm';
import Modal from '@components/Modal';
import CreateChannelForm from '../CreateChannelForm';
import InviteWorkspaceForm from '../InviteWorkspaceForm';
import { themeLib } from '@styles/themeLib';

const WorkspaceInfo = () => {
  const { workspace } = useParams<{ workspace: string }>();

  const { toggle: menuToggle, onToggle: onToggleWorkspaceMenu } = useToggle();
  const { toggle: createChannelModalToggle, onToggle: onToggleCreateChannelModal } = useToggle();
  const { toggle: inviteWorkspaceModalToggle, onToggle: onToggleInviteWorkspaceModal } = useToggle();

  useEffect(() => {
    if (createChannelModalToggle || inviteWorkspaceModalToggle) {
      onToggleWorkspaceMenu();
    }
  }, [createChannelModalToggle, inviteWorkspaceModalToggle, onToggleWorkspaceMenu]);
  return (
    <>
      <WorkspaceInfoStyle.Wrapper onClick={onToggleWorkspaceMenu}>
        <WorkspaceInfoStyle.WorkspaceName>
          {workspace}
          <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: '8px', fontSize: '15px' }} />
        </WorkspaceInfoStyle.WorkspaceName>
        <FontAwesomeIcon
          icon={faEdit}
          style={{
            marginRight: '18px',
            backgroundColor: `rgb(${themeLib.palette.white[100]})`,
            color: `rgb(${themeLib.main.fontColor})`,
            padding: '9px 10px',
            width: '36px',
            height: '36px',
            borderRadius: '100px',
            zIndex: 100,
          }}
        />
      </WorkspaceInfoStyle.Wrapper>
      <Menu show={menuToggle} onCloseMenu={onToggleWorkspaceMenu} style={{ top: 102, left: 80 }}>
        <SidebarMenuForm
          onToggleCreateChannelModal={onToggleCreateChannelModal}
          onToggleInviteWorkspaceModal={onToggleInviteWorkspaceModal}
        />
      </Menu>
      <Modal style={{}} show={createChannelModalToggle} onCloseModal={onToggleCreateChannelModal}>
        <CreateChannelForm onCloseModal={onToggleCreateChannelModal} />
      </Modal>
      <Modal show={inviteWorkspaceModalToggle} onCloseModal={onToggleInviteWorkspaceModal}>
        <InviteWorkspaceForm onCloseModal={onToggleInviteWorkspaceModal} />
      </Modal>
    </>
  );
};

export default WorkspaceInfo;
