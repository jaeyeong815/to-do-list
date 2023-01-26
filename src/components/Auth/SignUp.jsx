import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../apis/auth';
import { Wrapper, LoginForm, H4, Input, Button, StyledLink } from '../../styles/Style';

function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const emailIsValid = (email) => email?.includes('@');
  const passwordIsValid = (password) => password?.length > 7;
  const formIsValid = emailIsValid(userData.email) && passwordIsValid(userData.password);

  function onChangeHandle(e) {
    const { value, name } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }
  async function onSubmitHandle(e) {
    e.preventDefault();

    await authApi
      .signup({ email: userData.email, password: userData.password })
      .then(() => {
        alert('회원가입이 완료되었습니다!');
        navigate('/todo');
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <Wrapper>
      <h2>회원가입</h2>
      <LoginForm onSubmit={onSubmitHandle}>
        <div className='email'>
          <H4 className='email'>이메일</H4>
          <Input
            type='email'
            name='email'
            placeholder='이메일을 입력해주세요.'
            value={userData?.email || ''}
            onChange={onChangeHandle}
          />
        </div>
        <div className='password'>
          <H4 className='password'>비밀번호</H4>
          <Input
            type='password'
            name='password'
            placeholder='비밀번호를 입력해주세요.'
            value={userData?.password || ''}
            onChange={onChangeHandle}
          />
        </div>
        <Button type='submit' disabled={!formIsValid}>
          회원가입
        </Button>
      </LoginForm>
      <StyledLink to='/'>로그인</StyledLink>
    </Wrapper>
  );
}

export default SignUp;
