import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../common/Loader';
import { useAuth } from '../context/authContext';

const ProtectedRoute = () => {
  const { userLoggedIn, loading, token } = useAuth();

  if (loading && !userLoggedIn) return <Loader />;
  return userLoggedIn && token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/signin" replace />
  );
};

export default ProtectedRoute;
