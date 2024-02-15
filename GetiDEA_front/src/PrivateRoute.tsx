import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';


const PrivateRoute: React.FC = () => {
  const auth = useAuth();

  return auth?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
