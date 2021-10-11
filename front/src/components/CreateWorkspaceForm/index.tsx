import axios from 'axios';
import React, { FC, MouseEvent, useCallback, useEffect } from 'react';
import { Button, Input, Label } from '@pages/Signup/styles';
import useInput from '@hooks/useInput';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { apiKeys } from '@constants/apiKeys';

interface CreateWorkspaceFormProps {
  onCloseModal: () => void;
}

const CreateWorkspaceForm: FC<CreateWorkspaceFormProps> = ({ onCloseModal }) => {
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');
  const { mutate } = useSWRConfig();

  const onCreateWorkspace = useCallback(
    (e: MouseEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;

      axios
        .post(
          'http://localhost:3095/api/workspaces',
          {
            workspace: newWorkspace,
            url: newUrl,
          },
          { withCredentials: true },
        )
        .then(() => {
          mutate(apiKeys.users);
          onCloseModal();
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) {
            toast.error(err.response?.data);
          }
        });
    },
    [newWorkspace, newUrl],
  );

  useEffect(() => {
    return () => {
      setNewUrl('');
      setNewWorkspace('');
    };
  }, []);

  return (
    <form onSubmit={onCreateWorkspace}>
      <Label>
        <span>워크스페이스 이름</span>
        <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
      </Label>
      <Label>
        <span>워크스페이스 url</span>
        <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
      </Label>
      <Button type="submit">생성하기</Button>
    </form>
  );
};

export default CreateWorkspaceForm;
