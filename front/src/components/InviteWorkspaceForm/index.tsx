import React, { FC, MouseEvent, useCallback } from 'react';
import { Button, Input, Label } from '@pages/Signup/styles';
import { useParams } from 'react-router';
import useInput from '@hooks/useInput';

interface InviteWorkspaceFormProps {
  onCloseModal: () => void;
}

const InviteWorkspaceForm: FC<InviteWorkspaceFormProps> = ({ onCloseModal }) => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const { workspace } = useParams<{ workspace: string }>();

  const onInviteWorkspace = useCallback((e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);
  return (
    <form onSubmit={onInviteWorkspace}>
      <Label>
        <span>{workspace}(으)로 사용자 초대</span>
        <Input id="workspace" value={email} onChange={onChangeEmail} />
      </Label>
      <Button type="submit">보내기</Button>
    </form>
  );
};

export default InviteWorkspaceForm;
