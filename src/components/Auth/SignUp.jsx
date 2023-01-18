import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Wrapper, LoginForm, H4, Input, Button, StyledLink } from '../../styles/Style';

function SignUp() {
  const [userData, setUserData] = useState({});
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.email?.includes('@')) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }

    if (userData?.password?.length > 7) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  }, [userData]);

  function onChangeHandle(e) {
    const { value, name } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }
  async function onSubmitHandle(e) {
    e.preventDefault();
    await Axios.post(
      `https://pre-onboarding-selection-task.shop/auth/signup`,
      {
        email: userData.email,
        password: userData.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    alert('회원가입이 완료되었습니다!');
    navigate('/');
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
        <Button type='submit' disabled={!(isEmail && isPassword)}>
          회원가입
        </Button>
      </LoginForm>
      <StyledLink to='/'>로그인</StyledLink>
    </Wrapper>
  );
}

export default SignUp;
