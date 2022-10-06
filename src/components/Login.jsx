import React, { useState } from 'react';
import { Wrapper, LoginForm, H4, Input, Button, StyledLink } from './Style';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const navigate = useNavigate();

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

    if (loginData?.password?.length > 6) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  }

  async function onSubmitHandle(e) {
    e.preventDefault();

    await Axios.post(
      `https://pre-onboarding-selection-task.shop/auth/signin`,
      { email: loginData.email, password: loginData.password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(
      (res) => localStorage.setItem('token', res.data.access_token),
      navigate('/todo')
    );
  }

  return (
    <Wrapper>
      <LoginForm onSubmit={onSubmitHandle}>
        <div className="email">
          <H4 className="email">이메일</H4>
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={loginData?.email}
            onChange={onChangeHandle}
          />
        </div>
        <div className="password">
          <H4 className="password">비밀번호</H4>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={loginData?.password}
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
