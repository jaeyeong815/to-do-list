import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Login() {
  const [loginData, setLoginData] = useState({});
  const [disabled, setDisabled] = useState(true);

  function onChangeHandle(e) {
    const { value, name } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function validityCheck() {
    if (loginData.email.includes('@') && loginData.password.length >= 8) {
      setDisabled(false);
    } else {
      setDisabled(true);
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
        <Button
          type="submit"
          disabled={
            loginData.email.includes('@') && loginData.password.length >= 8
              ? false
              : true
          }
        >
          로그인
        </Button>
      </LoginForm>
      <StyledLink to="signup">회원가입</StyledLink>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: fit-content;
  margin: 0 auto;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H4 = styled.h4`
  margin-top: 0;
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  width: 200px;
  height: 25px;
`;

const Button = styled.button`
  padding: 10px 25px;
  margin-bottom: 10px;

  border: none;
  border-radius: 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: small;
  color: grey;
`;

export default Login;
