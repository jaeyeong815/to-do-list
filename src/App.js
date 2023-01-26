import Router from './routers/Router';
import TodoContextProvider from './context/TodoContext';

function App() {
  return (
    <TodoContextProvider>
      <Router />;
    </TodoContextProvider>
  );
}

export default App;
