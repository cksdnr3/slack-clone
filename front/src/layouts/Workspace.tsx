import React, { FC, useCallback } from 'react';
import Loading from '@components/loading';
import fetcher from '@utils/fetcher';
import axios, { AxiosResponse } from 'axios';
import { Redirect } from 'react-router';
import useSWR, { useSWRConfig } from 'swr';
import { apiKeys } from '@constants/apiKeys';

interface WorkspaceProps {}

interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  id: number;
  nickname: string;
  email: string;
  Workspaces: WorkSpace[];
}

interface WorkSpace {
  id: number;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  OwnerId: number | null;
  WorkspaceMember: {};
}

const Workspace: FC<WorkspaceProps> = ({ children }) => {
  const { mutate } = useSWRConfig();
  const { data, error, isValidating } = useSWR(apiKeys.users, fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then((res) => {
        mutate(apiKeys.users, false, false);
      });
  }, []);

  return (
    <div>
      {isValidating ? (
        <Loading />
      ) : (
        <>
          {!data && <Redirect to="/login" />}
          <button onClick={onLogout}>logout</button>
          {children}
        </>
      )}
    </div>
  );
};

export default Workspace;
