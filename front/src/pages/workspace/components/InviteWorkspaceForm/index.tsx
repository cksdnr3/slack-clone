import React, { FC, MouseEvent, useCallback, useEffect } from 'react';
import { Input, Label } from '@pages/signup/styles';
import { useParams } from 'react-router';
import useInput from '@hooks/useInput';
import { Form } from '@pages/workspace/components/CreateWorkspaceForm/styles';
import { Button, Footer, Title } from '@pages/workspace/components/CreateChannelForm/styles';
import axios from 'axios';
import { useSWRConfig } from 'swr';

interface InviteWorkspaceFormProps {
  onCloseModal: () => void;
}

const InviteWorkspaceForm: FC<InviteWorkspaceFormProps> = ({ onCloseModal }) => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const { mutate } = useSWRConfig();
  const { workspace } = useParams<{ workspace: string }>();

  const onInviteWorkspace = useCallback(
    (e: MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('enter');
      if (!email || !email.trim()) return;
      console.log('enter');
      axios
        .post(`/api/workspaces/${workspace}/members`, {
          email,
        })
        .then(() => {
          onCloseModal();
          mutate(`/api/workspaces/${workspace}/members`);
        });
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
        <h1 style={{ fontSize: '21px' }}>{workspace}(으)로 사용자 초대</h1>
      </Title>
      <Label>
        <span>받는 사람:</span>
        <Input
          id="workspace"
          value={email}
          onChange={onChangeEmail}
          placeholder="name@gmail.com"
          style={{ marginBottom: 0, fontWeight: 100 }}
        />
      </Label>
      <Footer>
        <div style={{ color: '#0067a3', fontWeight: 'bold' }}>초대 링크 복사</div>
        <Button type="submit">보내기</Button>
      </Footer>
    </Form>
  );
};

export default InviteWorkspaceForm;
