import React, { FC, MouseEvent, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import useInput from '@hooks/useInput';
import Form from '@components/Form';
import { useSWRConfig } from 'swr';
import { workspaceAPI } from '@apis/workspaces';
import { InviteWorkspaceFormStyle } from './styles';
import Input from '@components/Input';
import Button from '@components/Button';

interface InviteWorkspaceFormProps {
  onCloseModal: () => void;
}

const InviteWorkspaceForm: FC<InviteWorkspaceFormProps> = ({ onCloseModal }) => {
  const { workspace } = useParams<{ workspace: string }>();

  const { mutate } = useSWRConfig();

  const { value: email, onChange: onChangeEmail, setValue: setEmail } = useInput('');

  const onInviteWorkspace = useCallback(
    async (e: MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email || !email.trim()) return;
      try {
        await workspaceAPI.post.inviteWorkspace({ string: { workspace }, params: {} }, { email });
        await mutate(`/api/workspaces/${workspace}/members`);
        onCloseModal();
      } catch (e) {
        console.log(e);
      }
    },
    [email, workspace],
  );

  return (
    <Form
      onSubmit={onInviteWorkspace}
      header={<h1>{workspace}(으)로 사용자 초대</h1>}
      body={[
        <Input
          key={0}
          value={email}
          setValue={setEmail}
          onChange={onChangeEmail}
          placeholder="name@gmail.com"
          label="받는 사람"
          style={{ marginBottom: 0, fontWeight: 100 }}
        />,
      ]}
      footer={
        <>
          <InviteWorkspaceFormStyle.InviteLink>초대 링크 복사</InviteWorkspaceFormStyle.InviteLink>
          <Button color="gray" type="submit" text="보내기" />
        </>
      }
    />
  );
};

export default InviteWorkspaceForm;
