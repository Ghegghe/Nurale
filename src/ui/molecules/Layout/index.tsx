import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
