import styled from 'styled-components';
import { Link } from 'react-router-dom';

//todo 로그인, 회원가입, 투두 화면 가운데로

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: fit-content;
  margin: 0 auto;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const H4 = styled.h4`
  margin-top: 0;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  width: 200px;
  height: 25px;
`;

export const Button = styled.button`
  padding: 10px 25px;
  margin-bottom: 10px;

  border: none;
  border-radius: 5px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: small;
  color: grey;
`;
