import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: fit-content;
  margin: 0 auto;
`;

export const LiWrapper = styled.li`
  margin-bottom: 10px;

  & {
    text-align: center;
    list-style: none;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

export const H4 = styled.h4`
  margin-top: 0;
  margin-bottom: 5px;
`;

function getBackColor(state) {
  switch (state) {
    case 'completed':
      return '#B0C4DE';
    case 'not':
      return '#CD5C5C';
    case 'edit':
      return '#F5F5F5';
    case 'del':
      return '#FA8072';
    default:
      return '#fff';
  }
}

export const Span = styled.span`
  background-color: ${(props) => getBackColor(props.state)};
  color: white;
  font-size: small;

  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  width: 200px;
  height: 25px;
`;

export const TodoInput = styled.input`
  border: none;
  border-bottom: solid;

  margin-bottom: 10px;
  width: 200px;
  height: 25px;
`;

export const Button = styled.button`
  padding: 10px 25px;
  margin-right: 10px;
  margin-left: 10px;

  border: none;
  border-radius: 5px;

  cursor: pointer;
`;

export const TodoBtn = styled.button`
  background-color: ${(props) => getBackColor(props.state)};
  color: ${(props) => (props.state === 'del' ? '#fff' : '#000')};

  padding: 5px 10px;
  margin-left: 5px;

  border: none;
  border-radius: 5px;

  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: small;
  color: grey;
`;
