import React from 'react';
import CreateChannelForm from '@pages/workspace/components/CreateChannelForm';
import InviteWorkspaceForm from '@pages/workspace/components/InviteWorkspaceForm';
import Menu from '@components/Menu';
import Modal from '@components/Modal';
import Separator from '@components/Separator';
import { faAngleDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useToggle from '@hooks/useToggle';
import { WorkspaceButton } from '@pages/workspace/layouts/sidebar/style';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { SidebarHeaderStyle } from './styles';
import SidebarMenuForm from '../SidebarMenuForm';

const WorkspaceInfo = () => {
  const { workspace } = useParams<{ workspace: string }>();

  const { toggle: menuToggle, onToggle: onToggleWorkspaceMenu } = useToggle();
  return (
    <>
      <SidebarHeaderStyle.Wrapper onClick={onToggleWorkspaceMenu}>
        <SidebarHeaderStyle.WorkspaceName>
          {workspace}
          <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: '8px', fontSize: '15px' }} />
        </SidebarHeaderStyle.WorkspaceName>
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
        <Menu show={menuToggle} style={{ top: 102, left: 80 }}>
          <SidebarMenuForm />
        </Menu>
      </SidebarHeaderStyle.Wrapper>
    </>
  );
};

export default WorkspaceInfo;
