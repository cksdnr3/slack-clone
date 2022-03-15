import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { ILoginRequestBody, ILoginResponseBody, ISignupRequestBody } from './types';

export namespace userAPI {
  export const get = {};
  export const post = {
    login(body: ILoginRequestBody): AxiosPromise<ILoginResponseBody> {
      return axios.post('/api/users/login', body, { withCredentials: true });
    },
    logout(): AxiosPromise<void> {
      return axios.post('/api/users/logout', null, {
        withCredentials: true,
      });
    },
    signup(body: ISignupRequestBody) {
      return axios.post('/api/users', body);
    },
  };
}
