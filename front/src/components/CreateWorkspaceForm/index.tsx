import axios from 'axios';
import React, { FC, FormEvent, useCallback, useEffect } from 'react';
import { Button, Input, Label } from '@pages/signup/styles';
import useInput from '@hooks/useInput';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { Form } from './styles';
import { Title } from '@components/CreateChannelForm/styles';

interface CreateWorkspaceFormProps {
  onCloseModal: () => void;
}

const CreateWorkspaceForm: FC<CreateWorkspaceFormProps> = ({ onCloseModal }) => {
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');
  const { mutate } = useSWRConfig();

  const onCreateWorkspace = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;

      axios
        .post(
          '/api/workspaces',
          {
            workspace: newWorkspace,
            url: newUrl,
          },
          { withCredentials: true },
        )
        .then(() => {
          onCloseModal();
          mutate('/api/users');
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
    <Form onSubmit={onCreateWorkspace}>
      <Title>
        <h1>워크 스페이스 생성</h1>
      </Title>
      <Label>
        <span>이름</span>
        <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
      </Label>
      <Label>
        <span>URL</span>
        <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
      </Label>
      <Button type="submit">생성하기</Button>
    </Form>
  );
};

export default CreateWorkspaceForm;
