import React, { useState } from 'react';
import { Wrapper, LoginForm, H4, Input, Button, StyledLink } from './Style';

function SignUp() {
  const [userData, setUserData] = useState({});

  function onChangeHandle(e) {
    const { value, name } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }
  return (
    <>
      <Wrapper>
        <LoginForm>
          <div className="email">
            <H4 className="email">이메일</H4>
            <Input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={userData?.email}
              onChange={onChangeHandle}
            />
          </div>
          <div className="password">
            <H4 className="password">비밀번호</H4>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={userData?.password}
              onChange={onChangeHandle}
            />
          </div>
          <Button type="submit">회원가입</Button>
        </LoginForm>
        <StyledLink to="/">로그인</StyledLink>
      </Wrapper>
    </>
  );
}

export default SignUp;
