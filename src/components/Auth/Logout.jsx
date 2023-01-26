import { useNavigate } from 'react-router-dom';
import { Button } from '../../styles/Style';
import token from '../../utils/token';

function Logout() {
  const navigate = useNavigate();
  const logoutHandle = () => {
    token.delToken();
    alert('정상적으로 로그아웃되었습니다. 또 만나요~');
    navigate('/');
  };

  return (
    <Button state='submit' onClick={logoutHandle}>
      로그아웃
    </Button>
  );
}

export default Logout;
