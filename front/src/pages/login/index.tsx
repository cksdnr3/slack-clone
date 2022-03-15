import Loading from '@components/Loading';
import useInput from '@hooks/useInput';
import { Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/signup/styles';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback, useState, VFC } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { userAPI } from '@apis/users/index';
import useSWR from 'swr';

interface LoginProps {}

const LogIn: VFC<LoginProps> = () => {
  const { data: user, error, isValidating, mutate } = useSWR<IUser>('/api/users', fetcher);
  const history = useHistory();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await userAPI.post.login({ email, password });
        await mutate(response.data);
      } catch (e) {
        console.log(e);
      }
    },
    [email, password, mutate],
  );

  return (
    <>
      {isValidating ? (
        <Loading />
      ) : (
        <>
          {user && <Redirect to={`/workspace/${user?.Workspaces[0]?.name}/channel/일반`} />}
          <div id="container">
            <Header>Sleact</Header>
            <Form onSubmit={onSubmit}>
              <Label id="email-label">
                <span>이메일 주소</span>
                <div>
                  <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                </div>
              </Label>
              <Label id="password-label">
                <span>비밀번호</span>
                <div>
                  <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                </div>
                {error && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
              </Label>
              <Button type="submit">로그인</Button>
            </Form>
            <LinkContainer>
              아직 회원이 아니신가요?&nbsp;
              <Link to="/signup">회원가입 하러가기</Link>
            </LinkContainer>
          </div>
        </>
      )}
    </>
  );
};

export default LogIn;
