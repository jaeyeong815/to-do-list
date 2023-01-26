import { useContext } from 'react';
import todoApi from '../../apis/todo';
import { TodoContext } from '../../context/TodoContext';
import { Li, Span, TodoBtn } from '../../styles/Style';

function TodoList() {
  const todoCtx = useContext(TodoContext);

  async function deleteTodo(id) {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (confirm) {
      await todoApi.deleteTodo(id);
      todoCtx.getTodos();
    }
  }

  return todoCtx.todos?.map((todo) => (
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
        <TodoBtn className='negativeBtn' state={'del'} onClick={() => deleteTodo(todo.id)}>
          삭제
        </TodoBtn>
      </div>
    </Li>
  ));
}

export default TodoList;
