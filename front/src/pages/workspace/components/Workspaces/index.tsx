import CreateWorkspaceForm from '@pages/workspace/components/CreateWorkspaceForm';
import Modal from '@components/Modal';
import useToggle from '@hooks/useToggle';
import workspace from '@pages/workspace';
import { WorkspaceButton } from '@pages/workspace/layouts/sidebar/style';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { WorkspacesStyle } from './styles';

const Workspaces = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: user } = useSWR<IUser>('/api/users', fetcher);
  const { toggle: createWorkspaceModalToggle, onToggle: onToggleCreateWorkspaceModal } = useToggle();

  return (
    <WorkspacesStyle.Wrapper>
      {user?.Workspaces.map((ws) => (
        <WorkspacesStyle.LinkWrap
          key={ws.id}
          to={`/workspace/${ws.url}/channel/일반`}
          select={`${ws.name === workspace}`}
        >
          <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
        </WorkspacesStyle.LinkWrap>
      ))}
      <WorkspacesStyle.AddButton onClick={onToggleCreateWorkspaceModal}>+</WorkspacesStyle.AddButton>
      <Modal show={createWorkspaceModalToggle} onCloseModal={onToggleCreateWorkspaceModal}>
        <CreateWorkspaceForm onCloseModal={onToggleCreateWorkspaceModal} />
      </Modal>
    </WorkspacesStyle.Wrapper>
  );
};

export default Workspaces;
