import React, { useEffect, useState } from 'react';
import { Input, Button, H4 } from './Style';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { isLogin } from '../util/isLogin';

function Todo() {
  const [todoData, setTodoData] = useState([]);
  const [text, setText] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateText, setUpdateText] = useState(text);
  const [isCompleted, setIsCompleted] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      getTodo();
    } else {
      navigate('/');
    }
  }, [todoData]);

  function checkedCompleted(e) {
    //fix 수정 시 체크박스 반영이 안되고 있음
    if (e.currentTarget.checked) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
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
    await Axios.delete(
      `https://pre-onboarding-selection-task.shop/todos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async function updateHandle(id) {
    //fix 수정버튼 클릭 시 모든 할일이 수정모드가 됨
    await Axios.put(
      `https://pre-onboarding-selection-task.shop/todos/${id}`,
      { todo: updateText, isCompleted },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => setIsUpdate(false));
  }
  //todo 투두 완료여부 디자인 필요
  //todo ul이 점으로 되어있는데 수정할 수 있으면 하기 (디자인)
  //todo 수정,삭제,취소 버튼 디자인 필요

  return (
    <>
      <h1>투두 리스트</h1>
      <Input
        name="todoText"
        placeholder="할 일을 입력해주세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={createTodo}>추가</Button>
      <H4>해야할 일</H4>
      <ul>
        {todoData &&
          todoData.map((todo) => {
            return isUpdate ? (
              <li key={todo.id}>
                <input type="checkbox" onChange={checkedCompleted} />
                <Input
                  value={updateText}
                  onChange={(e) => setUpdateText(e.target.value)}
                />
                <button onClick={() => updateHandle(todo.id)}>제출</button>
                <button
                  onClick={() => {
                    setIsUpdate(false);
                    setText('');
                    setIsCompleted(todo.isCompleted);
                  }}
                >
                  취소
                </button>
              </li>
            ) : (
              <li key={todo.id}>
                {isCompleted ? <H4>완료!</H4> : <H4>아직</H4>}
                {todo.todo}
                <button
                  onClick={() => {
                    setIsUpdate(true);
                    setUpdateText(todo.todo);
                  }}
                >
                  수정
                </button>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default Todo;
