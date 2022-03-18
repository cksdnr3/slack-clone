import React, { useCallback, useState } from 'react';
import { Success, Error, LinkContainer, Header } from '@pages/signup/styles';
import { Link } from 'react-router-dom';
import useInput from '@hooks/useInput';
import { userAPI } from '@apis/users';
import Input from '@components/Input';
import useSWR, { useSWRConfig } from 'swr';

const SignUp = () => {
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
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" value={email} onChange={onChangeEmail} setValue={setEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" value={nickname} onChange={onChangeNickname} setValue={setNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" value={password} onChange={onChangePassword} setValue={setPassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input type="password" value={passwordCheck} onChange={onChangePasswordCheck} setValue={setPasswordCheck} />
          </div>
          {!email && <Error>이메일을 입력해주세요.</Error>}
          {!isPasswordCheckValid && !isPasswordValid && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {/* {error && <Error>{error}</Error>} */}
          {data && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button
          type="submit"
          disabled={(!isPasswordCheckValid && !isPasswordValid) || !nickname.length || !email.length}
        >
          회원가입
        </Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
