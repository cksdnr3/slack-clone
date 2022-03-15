import React, { FC, MouseEvent, useCallback, useEffect } from 'react';
import { Input } from '@pages/signup/styles';
import { useParams } from 'react-router';
import useInput from '@hooks/useInput';
import { Form } from '@pages/workspace/components/CreateWorkspaceForm/styles';
import { Button, Footer, Title } from '@pages/workspace/components/CreateChannelForm/styles';
import { useSWRConfig } from 'swr';
import { workspaceAPI } from '@apis/workspaces';

interface InviteChannelFormProps {
  onCloseModal: () => void;
}

const InviteChannelForm: FC<InviteChannelFormProps> = ({ onCloseModal }) => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const { mutate } = useSWRConfig();

  const [email, onChangeEmail, setEmail] = useInput('');

  const onInviteWorkspace = useCallback(
    async (e: MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email || !email.trim()) return;
      try {
        await workspaceAPI.post.inviteChannel({ string: { workspace, channel }, params: {} }, { email });
        await mutate(`/api/workspaces/${workspace}/channels/${channel}/members`);
        onCloseModal();
      } catch (e) {
        console.error(e);
      }
    },
    [email, workspace],
  );

  useEffect(() => {
    return () => {
      setEmail('');
    };
  }, []);

  return (
    <Form onSubmit={onInviteWorkspace}>
      <Title>
        <h1 style={{ fontSize: '17px' }}>사용자 추가</h1>
        <div style={{ textAlign: 'left', fontSize: '12px' }}>#{channel}</div>
      </Title>
      <Input
        id="workspace"
        value={email}
        onChange={onChangeEmail}
        placeholder="이름 또는 이메일 입력"
        style={{ marginBottom: 0, fontWeight: 100, color: 'black' }}
      />
      <Footer style={{ alignSelf: 'end' }}>
        <Button type="submit">저장</Button>
      </Footer>
    </Form>
  );
};

export default InviteChannelForm;
