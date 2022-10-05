import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Login() {
  return (
    <Wrapper>
      <LoginForm>
        <div className="email">
          <H4 className="email">이메일</H4>
          <Input type="email" />
        </div>
        <div className="password">
          <H4 className="password">비밀번호</H4>
          <Input type="password" />
        </div>
        <button type="submit">로그인</button>
      </LoginForm>
      <Link to="signup">회원가입</Link>
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
`;

export default Login;
