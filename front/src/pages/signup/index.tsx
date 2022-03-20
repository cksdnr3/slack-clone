import React, { FC, useCallback, useState } from 'react';
import { SignupStyle } from './styles';
import { Link } from 'react-router-dom';
import useInput from '@hooks/useInput';
import { userAPI } from '@apis/users';
import Input from '@components/Input';
import useSWR from 'swr';
import Button from '@components/Button';
import Form from '@components/Form';

interface ISignupProps {}

const SignUp: FC<ISignupProps> = () => {
  const { data, isValidating, mutate, error } = useSWR('/signup', {
    onError(err) {
      console.log(err);
    },
  });

  console.log(error);

  const { value: email, onChange: onChangeEmail, setValue: setEmail } = useInput('');
  const { value: nickname, onChange: onChangeNickname, setValue: setNickname } = useInput('');
  const {
    value: passwordCheck,
    isValid: isPasswordCheckValid,
    setValue: setPasswordCheck,
    onChange: onChangePasswordCheck,
  } = useInput('', (value: string): boolean => value === password);
  const {
    value: password,
    isValid: isPasswordValid,
    setValue: setPassword,
    onChange: onChangePassword,
  } = useInput('', (value: string): boolean => value === passwordCheck);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await mutate(userAPI.post.signup({ email, nickname, password }));
      } catch (e) {
        // console.log(e);
      } finally {
      }
    },
    [email, nickname, password],
  );

  return (
    <Form
      onSubmit={onSubmit}
      style={{ maxWidth: 400, margin: '0 auto', padding: 0 }}
      header={<SignupStyle.Header>Sleact</SignupStyle.Header>}
      body={[
        <Input type="email" value={email} onChange={onChangeEmail} setValue={setEmail} label="이메일 주소" />,
        <Input type="text" value={nickname} onChange={onChangeNickname} setValue={setNickname} label="닉네임" />,
        <Input type="password" value={password} onChange={onChangePassword} setValue={setPassword} label="패스워드" />,
        <Input
          type="password"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
          setValue={setPasswordCheck}
          label="비밀번호 확인"
        />,
      ]}
      footer={
        <SignupStyle.Footer>
          {!email && <SignupStyle.Error>이메일을 입력해주세요.</SignupStyle.Error>}
          {!isPasswordCheckValid && !isPasswordValid && (
            <SignupStyle.Error>비밀번호가 일치하지 않습니다.</SignupStyle.Error>
          )}
          {!nickname && <SignupStyle.Error>닉네임을 입력해주세요.</SignupStyle.Error>}
          {/* {error && <Error>{error}</Error>} */}
          {data && <SignupStyle.Success>회원가입되었습니다! 로그인해주세요.</SignupStyle.Success>}
          <Button
            type="submit"
            disabled={
              (!isPasswordCheckValid && !isPasswordValid) || !nickname.length || !email.length || !password.length
            }
            text="회원가입"
            color="purple"
            size="large"
          />
          <SignupStyle.LinkHighlighter>
            이미 회원이신가요?&nbsp;
            <Link to="/login">로그인 하러가기</Link>
          </SignupStyle.LinkHighlighter>
        </SignupStyle.Footer>
      }
    />
  );
};

export default SignUp;
