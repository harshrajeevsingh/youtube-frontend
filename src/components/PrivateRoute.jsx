import { Navigate, useLocation } from 'react-router-dom';
import { useUserStoreSelectors } from '../store/userSlice';

const PrivateRoute = ({ children }) => {
  const user = useUserStoreSelectors.use.user();
  const location = useLocation();
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
