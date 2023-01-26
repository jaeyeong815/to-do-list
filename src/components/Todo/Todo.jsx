import React, { useEffect, useContext } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import EditTodo from './EditTodo';
import Logout from '../Auth/Logout';
import { TodoContext } from '../../context/TodoContext';
import { Wrapper, Ul } from '../../styles/Style';

function Todo() {
  const todoCtx = useContext(TodoContext);

  useEffect(() => {
    todoCtx.getTodos();
  }, []);

  return (
    <Wrapper>
      <h1>투두 리스트</h1>
      <AddTodo />
      <Ul>{todoCtx.isUpdating ? <EditTodo /> : <TodoList />}</Ul>
      <Logout />
    </Wrapper>
  );
}

export default Todo;
