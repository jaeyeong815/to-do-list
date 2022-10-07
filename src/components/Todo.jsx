import React, { useEffect, useState } from 'react';
import { Input, Button, H4 } from './Style';
import Axios from 'axios';

function Todo() {
  const [todoData, setTodoData] = useState([]);
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    getTodo();
  }, [todoData]);

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

  function checkedHandle(e) {
    if (e.target.checked) {
      // todo 투두 완료여부 업데이트
    }
  }

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
            return (
              <li key={todo.id}>
                <input type="checkbox" onChange={checkedHandle} />
                {todo.todo}
                <button>수정</button>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default Todo;
