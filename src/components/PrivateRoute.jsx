import { Navigate } from 'react-router-dom';
import { useUserStoreSelectors } from '../store/userSlice';

const PrivateRoute = ({ children }) => {
  const user = useUserStoreSelectors.use.user();
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
