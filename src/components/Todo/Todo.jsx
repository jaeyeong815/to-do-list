import React, { useEffect, useState, useContext } from 'react';
import EditTodo from './EditTodo';
import todoApi from '../../apis/todo';
import { TodoContext } from '../../context/TodoContext';
import { Wrapper, TodoInput, Button, TodoBtn, Span, Li, Ul } from '../../styles/Style';

function Todo() {
  const todoCtx = useContext(TodoContext);
  const [text, setText] = useState('');

  useEffect(() => {
    todoCtx.getTodos();
  }, []);

  async function createTodo() {
    if (text.trim().length === 0) {
      alert('할 일을 작성해주세요.');
      return;
    }
    await todoApi.createTodo({ todo: text });
    todoCtx.getTodos();
    alert('할 일이 등록되었어요!');
    setText('');
  }

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
      <div className='inputWrapper'>
        <TodoInput
          name='todoText'
          placeholder='할 일을 입력해주세요.'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={createTodo}>추가</Button>
      </div>
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
