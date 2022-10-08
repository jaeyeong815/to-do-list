import React, { useState, useEffect } from 'react';
import { Wrapper, LoginForm, H4, Input, Button, StyledLink } from './Style';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [userData, setUserData] = useState({});
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const navigate = useNavigate();
  //todo 회원가입 제목 필요
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
    //todo 이메일 형식 안맞을 시 안내 메시지
    //todo 패스워드 형식 안맞을 시 안내 메시지
    //todo 형식 맞을 시 안내 메시지
    const { value, name } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }
  async function onSubmitHandle(e) {
    e.preventDefault();
    //todo 회원가입 완료 안내메시지 띄우기
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
    navigate('/');
  }
  return (
    <>
      <Wrapper>
        <LoginForm onSubmit={onSubmitHandle}>
          <div className="email">
            <H4 className="email">이메일</H4>
            <Input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={userData?.email || ''}
              onChange={onChangeHandle}
            />
          </div>
          <div className="password">
            <H4 className="password">비밀번호</H4>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={userData?.password || ''}
              onChange={onChangeHandle}
            />
          </div>
          <Button type="submit" disabled={!(isEmail && isPassword)}>
            회원가입
          </Button>
        </LoginForm>
        <StyledLink to="/">로그인</StyledLink>
      </Wrapper>
    </>
  );
}

export default SignUp;
