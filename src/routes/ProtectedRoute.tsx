import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = () => {
  const { userLoggedIn, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return userLoggedIn ? <Outlet /> : <Navigate to="/auth/signin" replace />;
};

export default ProtectedRoute;
