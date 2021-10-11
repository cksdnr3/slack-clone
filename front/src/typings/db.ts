export interface IUser {
  id: number;
  nickname: string;
  email: string;
  Workspaces: IWorkSpace[];
}

export interface IWorkSpace {
  id: number;
  name: string;
  url: string;
  OwnerId: number;
  WorkspaceMember: IMember;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IMember {
  UserId: number;
  WorkspaceId: number;
  createdAt: string;
  updatedAt: string;
  loggedInAt: string;
}
