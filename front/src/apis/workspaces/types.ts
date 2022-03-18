import { IChannel, IWorkspace } from '@typings/db';

export interface ICreateChannelRequestBody {
  name: string;
}

export interface ICreateChannelResponseBody extends IChannel {}

export interface IInviteChannelRequestBody {
  email: string;
}

export interface ICreateWorkspaceRequestBody {
  workspace: string;
  url: string;
}

export interface ICreateWorkspaceResponseBody extends IWorkspace {}

export interface IInviteWorkspaceRequestBody {
  email: string;
}
