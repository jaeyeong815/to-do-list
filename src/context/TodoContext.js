import { createContext, useState } from 'react';
import todoApi from '../apis/todo';

const defaultValue = {
  getTodos: () => {},
  todos: [],
  isUpdating: false,
  updateData: {},
  updateModeHandle: (id, text, completed) => {},
};

export const TodoContext = createContext(defaultValue);

function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const getTodos = async () => {
    const todos = await todoApi.getTodos();
    setTodos(todos);
  };

  const updateMode = (id, text, completed) => {
    setIsUpdating((prevMode) => !prevMode);
    setUpdateData({
      updateId: id,
      updateText: text,
      updateCompleted: completed,
    });
  };

  const todoContext = {
    getTodos,
    todos,
    isUpdating,
    updateData,
    updateModeHandle: updateMode,
  };

  return <TodoContext.Provider value={todoContext}>{children}</TodoContext.Provider>;
}

export default TodoContextProvider;
