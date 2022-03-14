import React, { FC, MouseEvent, useCallback, useEffect } from 'react';
import { Input, Label } from '@pages/signup/styles';
import { useParams } from 'react-router';
import useInput from '@hooks/useInput';
import { Form } from '@components/CreateWorkspaceForm/styles';
import { Button, Footer, Title } from '@components/CreateChannelForm/styles';
import axios from 'axios';
import { useSWRConfig } from 'swr';

interface InviteChannelFormProps {
  onCloseModal: () => void;
}

const InviteChannelForm: FC<InviteChannelFormProps> = ({ onCloseModal }) => {
  const [member, onChangeMember, setMember] = useInput('');
  const { mutate } = useSWRConfig();
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const onInviteWorkspace = useCallback(
    (e: MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!member || !member.trim()) return;
      axios
        .post(
          `/api/workspaces/${workspace}/channels/${channel}/members`,
          {
            email: member,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          onCloseModal();
          mutate(`/api/workspaces/${workspace}/channels/${channel}/members`);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [member, workspace],
  );

  useEffect(() => {
    return () => {
      setMember('');
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
        value={member}
        onChange={onChangeMember}
        placeholder="이름 또는 이메일 입력"
        style={{ marginBottom: 0, fontWeight: 100 }}
      />
      <Footer>
        <div />
        <Button type="submit">완료됨</Button>
      </Footer>
    </Form>
  );
};

export default InviteChannelForm;
