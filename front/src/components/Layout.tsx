import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
     <Sidebar/>
     <Outlet />
    </div>
  );
};

export default Layout;