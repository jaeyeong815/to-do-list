import { useContext, useState } from 'react';
import todoApi from '../../apis/todo';
import { TodoContext } from '../../context/TodoContext';
import { Button, TodoInput } from '../../styles/Style';

function AddTodo() {
  const todoCtx = useContext(TodoContext);
  const [text, setText] = useState('');

  async function createTodo() {
    if (text.trim().length === 0) {
      alert('할 일을 작성해주세요.');
      return;
    }
    await todoApi.createTodo({ todo: text });
    alert('할 일이 등록되었어요!');
    todoCtx.getTodos();
    setText('');
  }

  return (
    <div className='inputWrapper'>
      <TodoInput
        name='todoText'
        placeholder='할 일을 입력해주세요.'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={createTodo}>추가</Button>
    </div>
  );
}

export default AddTodo;
