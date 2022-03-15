import axios from 'axios';
import React, { FC, FormEvent, useCallback, useEffect } from 'react';
import { Button, Input, Label } from '@pages/signup/styles';
import useInput from '@hooks/useInput';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';
import { Form } from './styles';
import { Title } from '@pages/workspace/components/CreateChannelForm/styles';
import { workspaceAPI } from '@apis/workspaces';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

interface CreateWorkspaceFormProps {
  onCloseModal: () => void;
}

const CreateWorkspaceForm: FC<CreateWorkspaceFormProps> = ({ onCloseModal }) => {
  const [workspace, onChangeWorkspace, setWorkspace] = useInput('');
  const { data: user, mutate } = useSWR<IUser>('/api/users', fetcher);

  const [url, onChangeUrl, setUrl] = useInput('');

  const onCreateWorkspace = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!user) return;
      if (!workspace || !workspace.trim()) return;
      if (!url || !url.trim()) return;

      try {
        const response = await workspaceAPI.post.createWorkspace({ workspace, url });
        await mutate({ ...user, Workspaces: [...user?.Workspaces, response.data] });
        onCloseModal();
      } catch (e) {
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data);
        }
      }
    },
    [workspace, url, user],
  );

  useEffect(() => {
    return () => {
      setUrl('');
      setWorkspace('');
    };
  }, []);

  return (
    <Form onSubmit={onCreateWorkspace}>
      <Title>
        <h1>워크 스페이스 생성</h1>
      </Title>
      <Label>
        <span>이름</span>
        <Input id="workspace" value={workspace} onChange={onChangeWorkspace} />
      </Label>
      <Label>
        <span>URL</span>
        <Input id="workspace" value={url} onChange={onChangeUrl} />
      </Label>
      <Button type="submit">생성하기</Button>
    </Form>
  );
};

export default CreateWorkspaceForm;
