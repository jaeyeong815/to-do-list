import React, { useContext, useState } from 'react';
import todoApi from '../../apis/todo';
import { TodoContext } from '../../context/TodoContext';
import { Li, TodoBtn, TodoCheck, TodoInput } from '../../styles/Style';

const EditTodo = () => {
  const todoCtx = useContext(TodoContext);
  const [enteredText, setEnteredText] = useState(todoCtx.updateData?.updateText);
  const [isCompleted, setIsCompleted] = useState(todoCtx.updateData?.updateCompleted);

  function checkedCompleted(e) {
    setIsCompleted(e.currentTarget.checked);
  }

  async function updateHandle() {
    const confirm = window.confirm('할 일을 수정하시겠습니까?');
    if (confirm) {
      await todoApi.updateTodo(todoCtx.updateData?.updateId, { todo: enteredText, isCompleted });
      todoCtx.updateModeHandle();
      todoCtx.getTodos();
    }
  }

  function cancelHandle() {
    todoCtx.updateModeHandle();
  }

  return (
    <Li key={todoCtx.updateData?.updateId}>
      <TodoCheck type='checkbox' id='checkbox' checked={isCompleted} onChange={checkedCompleted} />
      <TodoInput value={enteredText} onChange={(e) => setEnteredText(e.target.value)} />
      <TodoBtn state={'submit'} onClick={updateHandle}>
        제출
      </TodoBtn>
      <TodoBtn state={'del'} onClick={cancelHandle}>
        취소
      </TodoBtn>
    </Li>
  );
};

export default EditTodo;
