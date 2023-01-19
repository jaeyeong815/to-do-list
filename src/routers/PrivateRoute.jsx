import { Navigate, Outlet } from 'react-router-dom';
import token from '../utils/token';

function PrivateRoute({ authenticationRequired }) {
  const isLogin = token.getToken();

  if (authenticationRequired) {
    return isLogin ? <Outlet /> : <Navigate to='/' />;
  }

  return isLogin ? <Navigate to='/todo' /> : <Outlet />;
}

export default PrivateRoute;
