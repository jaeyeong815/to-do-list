import React, { useState } from 'react';
import { Wrapper, LoginForm, H4, Input, Button, StyledLink } from './Style';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  function onChangeHandle(e) {
    const { value, name } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    if (loginData?.email?.includes('@')) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
    console.log(loginData?.password?.length);
    if (loginData?.password?.length > 6) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  }

  function handleSubmit() {}

  return (
    <Wrapper>
      <LoginForm>
        <div className="email">
          <H4 className="email">이메일</H4>
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={loginData.email || ''}
            onChange={onChangeHandle}
          />
        </div>
        <div className="password">
          <H4 className="password">비밀번호</H4>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={loginData.password || ''}
            onChange={onChangeHandle}
          />
        </div>
        <Button type="submit" disabled={!(isEmail && isPassword)}>
          로그인
        </Button>
      </LoginForm>
      <StyledLink to="signup">회원가입</StyledLink>
    </Wrapper>
  );
}

export default Login;
