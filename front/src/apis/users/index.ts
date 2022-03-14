import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { ILoginRequestBody, ILoginResponseBody } from './types';

export namespace userAPI {
  export const get = {};
  export const post = {
    login({ data }: AxiosRequestConfig<ILoginRequestBody>): AxiosPromise<ILoginResponseBody> {
      const { email, password } = data!;
      return axios.post('/api/users/login', { email, password }, { withCredentials: true });
    },
    logout(): AxiosPromise<void> {
      return axios.post('/api/users/logout', null, {
        withCredentials: true,
      });
    },
  };
}
