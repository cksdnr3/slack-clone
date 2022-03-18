import React, { FC, MouseEvent, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import useInput from '@hooks/useInput';
import { useSWRConfig } from 'swr';
import { workspaceAPI } from '@apis/workspaces';
import Form from '@components/Form';
import Input from '@components/Input';
import Button from '@components/Button';
import { InviteChannelFormStyle } from './styles';

interface InviteChannelFormProps {
  onCloseModal: () => void;
}

const InviteChannelForm: FC<InviteChannelFormProps> = ({ onCloseModal }) => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const { mutate } = useSWRConfig();

  const { value: email, onChange: onChangeEmail, setValue: setEmail } = useInput('');

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
    <Form
      onSubmit={onInviteWorkspace}
      header={
        <>
          <InviteChannelFormStyle.Heading>사용자 추가</InviteChannelFormStyle.Heading>
          <InviteChannelFormStyle.WorkspaceName># {channel}</InviteChannelFormStyle.WorkspaceName>
        </>
      }
      body={[
        <Input
          key={0}
          value={email}
          setValue={setEmail}
          onChange={onChangeEmail}
          placeholder="이름 또는 이메일 입력"
        />,
      ]}
      footer={<Button style={{}} type="submit" text="저장" color="gray" />}
    />
  );
};

export default InviteChannelForm;
