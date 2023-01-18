import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Todo from '../components/Todo';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
