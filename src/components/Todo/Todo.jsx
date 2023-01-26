import React, { useEffect, useContext } from 'react';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import todoApi from '../../apis/todo';
import { TodoContext } from '../../context/TodoContext';
import { Wrapper, TodoBtn, Span, Li, Ul } from '../../styles/Style';

function Todo() {
  const todoCtx = useContext(TodoContext);

  useEffect(() => {
    todoCtx.getTodos();
  }, []);

  async function deleteTodo(id) {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (confirm) {
      await todoApi.deleteTodo(id);
      todoCtx.getTodos();
    }
  }

  return (
    <Wrapper>
      <h1>투두 리스트</h1>
      <AddTodo />
      <Ul>
        {todoCtx.isUpdating ? (
          <EditTodo />
        ) : (
          <>
            {todoCtx.todos?.map((todo) => {
              return (
                <Li key={todo.id}>
                  <div className='isCompleted'>
                    {todo.isCompleted ? (
                      <Span state={'completed'}>완료!</Span>
                    ) : (
                      <Span state={'not'}>미완료</Span>
                    )}
                  </div>
                  <div className='todo'>{todo.todo}</div>
                  <div className='positiveBtn'>
                    <TodoBtn
                      state={'edit'}
                      onClick={() => {
                        todoCtx.updateModeHandle(todo.id, todo.todo, todo.isCompleted);
                      }}
                    >
                      수정
                    </TodoBtn>
                    <TodoBtn
                      className='negativeBtn'
                      state={'del'}
                      onClick={() => deleteTodo(todo.id)}
                    >
                      삭제
                    </TodoBtn>
                  </div>
                </Li>
              );
            })}
          </>
        )}
      </Ul>
    </Wrapper>
  );
}

export default Todo;
