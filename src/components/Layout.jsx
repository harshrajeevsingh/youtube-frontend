import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'sonner';

const Layout = () => {
  const location = useLocation();

  // Array of paths where Header should not be present
  const noHeaderPaths = ['/signup', '/login'];

  return (
    <div>
      <Toaster richColors position="top-center" />
      {/* Conditionally render Header */}
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
