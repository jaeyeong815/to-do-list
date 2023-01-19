import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import Todo from '../components/Todo/Todo';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute authenticationRequired />}>
          <Route path='/todo' element={<Todo />} />
        </Route>
        <Route element={<PrivateRoute authenticationRequired={false} />}>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
