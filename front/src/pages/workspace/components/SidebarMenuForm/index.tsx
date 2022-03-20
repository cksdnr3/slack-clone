import { workspaceAPI } from '@apis/workspaces';
import CreateChannelForm from '@pages/workspace/components/CreateChannelForm';
import InviteWorkspaceForm from '@pages/workspace/components/InviteWorkspaceForm';
import Modal from '@components/Modal';
import Separator from '@components/Separator';
import useToggle from '@hooks/useToggle';
import { SidebarStyle } from '@pages/workspace/layouts/sidebar/style';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useEffect } from 'react';
import useSWR from 'swr';
import { SidebarMenuFormStyle } from './styles';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

interface ISidebarMenuFormProps {
  onToggleCreateChannelModal: () => void;
  onToggleInviteWorkspaceModal: () => void;
}

const SidebarMenuForm: FC<ISidebarMenuFormProps> = ({ onToggleCreateChannelModal, onToggleInviteWorkspaceModal }) => {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: user } = useSWR<IUser>('/api/users', fetcher);

  const onLogoutFromWorkspace = useCallback(async () => {
    if (!user || !workspace) return;
    await workspaceAPI.del.deleteWorkspaceMember({ string: { workspace: workspace, id: user.id }, params: {} });
  }, []);

  return (
    <SidebarMenuFormStyle.Wrapper>
      <SidebarMenuFormStyle.WorkspaceModalTop>
        <SidebarStyle.WorkspaceButton>{workspace?.slice(0, 1).toUpperCase()}</SidebarStyle.WorkspaceButton>
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
      </SidebarMenuFormStyle.WorkspaceModalTop>
      <Separator />
      <button onClick={onToggleCreateChannelModal}>채널 생성</button>
      <button onClick={onToggleInviteWorkspaceModal}>{workspace}에 사용자 초대</button>
      <Separator />
      <button onClick={onLogoutFromWorkspace}>{workspace}에서 로그아웃</button>
    </SidebarMenuFormStyle.Wrapper>
  );
};

export default SidebarMenuForm;
