import { IUser } from '@typings/db';

export interface ILoginRequestBody {
  email: string;
  password: string;
}

export interface ILoginResponseBody extends IUser {}
