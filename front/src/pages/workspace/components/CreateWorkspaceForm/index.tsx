import axios from 'axios';
import React, { FC, FormEvent, useCallback, useEffect } from 'react';
import useInput from '@hooks/useInput';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';
import { workspaceAPI } from '@apis/workspaces';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import Input from '@components/Input';
import Form from '@components/Form';
import Button from '@components/Button';

interface CreateWorkspaceFormProps {
  onCloseModal: () => void;
}

const CreateWorkspaceForm: FC<CreateWorkspaceFormProps> = ({ onCloseModal }) => {
  const { data: user, mutate } = useSWR<IUser>('/api/users', fetcher);

  const { value: workspace, onChange: onChangeWorkspace, setValue: setWorkspace } = useInput('');
  const { value: url, onChange: onChangeUrl, setValue: setUrl } = useInput('');

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

  return (
    <Form
      onSubmit={onCreateWorkspace}
      header={<h1>워크 스페이스 생성</h1>}
      body={[
        <Input key={0} value={workspace} setValue={setWorkspace} onChange={onChangeWorkspace} label="이름" />,
        <Input key={1} value={url} setValue={setUrl} onChange={onChangeUrl} label="URL" />,
      ]}
      footer={<Button type="submit" text="생성하기" color="gray" />}
    />
  );
};

export default CreateWorkspaceForm;
