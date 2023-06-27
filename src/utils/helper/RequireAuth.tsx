import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getTokenCookies } from '../auth';

function RequireAuth(): JSX.Element {
  const { token } = getTokenCookies();
  const location = useLocation();

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
