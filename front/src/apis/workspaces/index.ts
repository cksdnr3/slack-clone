import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import {
  ICreateChannelRequestBody,
  ICreateChannelResponseBody,
  ICreateWorkspaceRequestBody,
  ICreateWorkspaceResponseBody,
  IInviteChannelRequestBody,
} from './types';

interface Query<S, P> {
  string: S;
  params: P;
}

export namespace workspaceAPI {
  export const post = {
    createChannel(
      query: Query<{ workspace: string }, {}>,
      body: ICreateChannelRequestBody,
    ): AxiosPromise<ICreateChannelResponseBody> {
      return axios.post(`/api/workspaces/${query.string.workspace}/channels`, body, { withCredentials: true });
    },
    createWorkspace(body: ICreateWorkspaceRequestBody): AxiosPromise<ICreateWorkspaceResponseBody> {
      return axios.post('/api/workspaces', body, { withCredentials: true });
    },
    inviteChannel(
      query: Query<{ workspace: string; channel: string }, {}>,
      body: IInviteChannelRequestBody,
    ): AxiosPromise<void> {
      return axios.post(`/api/workspaces/${query.string.workspace}/channels/${query.string.channel}/members`, body, {
        withCredentials: true,
      });
    },
  };

  export const del = {
    deleteWorkspaceMember(query: Query<{ workspace: string; id: number }, {}>): AxiosPromise<void> {
      return axios.delete(`/api/workspaces/${query.string.workspace}/members/${query.string.id}`, {
        withCredentials: true,
      });
    },
  };
}
