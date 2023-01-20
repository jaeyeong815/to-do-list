import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../apis/auth';
import { Wrapper, LoginForm, H4, Input, Button, StyledLink } from '../../styles/Style';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});

  const emailIsValid = (email) => email?.includes('@');
  const passwordIsValid = (password) => password?.length > 7;
  const formIsValid = emailIsValid(loginData.email) && passwordIsValid(loginData.password);

  function onChangeHandle(e) {
    const { value, name } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onSubmitHandle(e) {
    e.preventDefault();

    await authApi.login({ email: loginData.email, password: loginData.password });
    navigate('/todo');
  }

  return (
    <Wrapper>
      <h2>로그인</h2>
      <LoginForm onSubmit={onSubmitHandle}>
        <div className='email'>
          <H4 className='email'>이메일</H4>
          <Input
            type='email'
            name='email'
            placeholder='이메일을 입력해주세요.'
            value={loginData?.email || ''}
            onChange={onChangeHandle}
          />
        </div>
        <div className='password'>
          <H4 className='password'>비밀번호</H4>
          <Input
            type='password'
            name='password'
            placeholder='비밀번호를 입력해주세요.'
            value={loginData?.password || ''}
            onChange={onChangeHandle}
          />
        </div>
        <Button type='submit' disabled={!formIsValid}>
          로그인
        </Button>
      </LoginForm>
      <StyledLink to='signup'>회원가입</StyledLink>
    </Wrapper>
  );
}

export default Login;
