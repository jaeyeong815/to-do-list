import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { isLogin } from '../../utils/isLogin';
import { Wrapper, TodoInput, Button, TodoBtn, Span, LiWrapper } from '../../styles/Style';

function Todo() {
  const [todoData, setTodoData] = useState([]);
  const [text, setText] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [updateText, setUpdateText] = useState(text);
  const [isCompleted, setIsCompleted] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin()) {
      getTodo();
    } else {
      navigate('/');
    }
  }, [todoData]);

  function checkedCompleted(e) {
    setIsCompleted(e.currentTarget.checked);
  }

  async function getTodo() {
    await Axios.get(`https://pre-onboarding-selection-task.shop/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => setTodoData(res.data));
  }

  async function createTodo() {
    await Axios.post(
      `https://pre-onboarding-selection-task.shop/todos`,
      { todo: text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => setTodoData([...todoData, res.data], setText('')));
  }

  async function deleteTodo(id) {
    await Axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function updateHandle() {
    await Axios.put(
      `https://pre-onboarding-selection-task.shop/todos/${updateId}`,
      { todo: updateText, isCompleted },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => setIsUpdate(false));
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
          todoData?.map((todo) => {
            return (
              <LiWrapper>
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
              </LiWrapper>
            );
          })
        )}
      </ul>
    </Wrapper>
  );
}

export default Todo;
