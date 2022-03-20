import Loading from '@components/Loading';
import useInput from '@hooks/useInput';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback, VFC } from 'react';
import { Link, Navigate, Route } from 'react-router-dom';
import { userAPI } from '@apis/users/index';
import useSWR from 'swr';
import Input from '@components/Input';
import Button from '@components/Button';
import Form from '@components/Form';
import { LoginStyle } from './styles';

interface LoginProps {}

const Login: VFC<LoginProps> = () => {
  const { data: user, error, isValidating, mutate } = useSWR<IUser>('/api/users', fetcher);

  const { value: email, setValue: setEmail, onChange: onChangeEmail } = useInput('');
  const { value: password, setValue: setPassword, onChange: onChangePassword } = useInput('');

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
      {user && <Navigate replace to={`/workspace/${user?.Workspaces[0]?.url}/channel/일반`} />}
      <LoginStyle.Wrapper>
        <Form
          onSubmit={onSubmit}
          style={{ maxWidth: 400, margin: '0 auto', padding: 0 }}
          header={<LoginStyle.Header>Sleact</LoginStyle.Header>}
          body={[
            <Input
              key={0}
              type="email"
              value={email}
              setValue={setEmail}
              onChange={onChangeEmail}
              label="이메일 주소"
            />,
            <Input
              key={1}
              type="password"
              value={password}
              setValue={setPassword}
              onChange={onChangePassword}
              label="비밀번호"
            />,
          ]}
          footer={
            <LoginStyle.Footer>
              <Button type="submit" text="로그인" color="purple" size="large" />
              <LoginStyle.LinkHighlighter>
                아직 회원이 아니신가요?&nbsp;
                <Link to="/signup">회원가입 하러가기</Link>
              </LoginStyle.LinkHighlighter>
            </LoginStyle.Footer>
          }
        />
      </LoginStyle.Wrapper>
    </>
  );
};

export default Login;
