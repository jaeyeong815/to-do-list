import React, { useEffect, useState } from 'react';
import todoApi from '../../apis/todo';
import { Wrapper, TodoInput, Button, TodoBtn, Span, LiWrapper } from '../../styles/Style';

function Todo() {
  const [todoData, setTodoData] = useState([]);
  const [text, setText] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [updateText, setUpdateText] = useState(text);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    getTodo();
  }, []);

  function checkedCompleted(e) {
    setIsCompleted(e.currentTarget.checked);
  }

  async function getTodo() {
    const todos = await todoApi.getTodos();
    setTodoData(todos);
  }

  async function createTodo() {
    const todo = await todoApi.createTodo({ todo: text });
    setTodoData([...todoData, todo]);
    setText('');
  }

  async function deleteTodo(id) {
    await todoApi.deleteTodo(id);
  }

  async function updateHandle() {
    await todoApi.updateTodo(updateId, { todo: updateText, isCompleted });
    setIsUpdate(false);
    getTodo();
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
      <ul style={{ padding: '0px' }}>
        {isUpdate ? (
          <li key={updateId}>
            <input
              type='checkbox'
              id='checkbox'
              checked={isCompleted}
              onChange={checkedCompleted}
            />
            <TodoInput value={updateText} onChange={(e) => setUpdateText(e.target.value)} />
            <TodoBtn onClick={() => updateHandle()}>제출</TodoBtn>
            <TodoBtn
              onClick={() => {
                setIsUpdate(false);
                setText('');
                setIsCompleted(false);
              }}
            >
              취소
            </TodoBtn>
          </li>
        ) : (
          <LiWrapper>
            {todoData?.map((todo) => {
              return (
                <li key={todo.id}>
                  {todo.isCompleted ? (
                    <Span state={'completed'}>완료!</Span>
                  ) : (
                    <Span state={'not'}>미완료</Span>
                  )}
                  {todo.todo}
                  <TodoBtn
                    state={'edit'}
                    onClick={() => {
                      setIsUpdate(true);
                      setUpdateText(todo.todo);
                      setIsCompleted(todo.isCompleted);
                      setUpdateId(todo.id);
                    }}
                  >
                    수정
                  </TodoBtn>
                  <TodoBtn state={'del'} onClick={() => deleteTodo(todo.id)}>
                    삭제
                  </TodoBtn>
                </li>
              );
            })}
          </LiWrapper>
        )}
      </ul>
    </Wrapper>
  );
}

export default Todo;
