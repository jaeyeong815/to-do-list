import { todoInstance } from './instance';

const todoApi = {
  getTodos: () => todoInstance.get('/').then((res) => res.data),
  createTodo: (todo) =>
    todoInstance
      .post('/', todo, { headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.data),
  updateTodo: (updateTodoId, updateTodo) =>
    todoInstance.put(`/${updateTodoId}`, updateTodo, {
      headers: { 'Content-Type': 'application/json' },
    }),
  deleteTodo: (deleteTodoId) => todoInstance.delete(`/${deleteTodoId}`),
};

export default todoApi;
