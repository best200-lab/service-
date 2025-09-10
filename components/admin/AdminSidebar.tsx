import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import {
  DashboardIcon,
  AdminUsersIcon,
  AdminVerifyIcon,
  LogoutIcon,
} from '../icons';
import { AdminContext } from '../../layouts/AdminLayout';

const AdminSidebar: React.FC = () => {
    const navigate = useNavigate();
    // Fix: Consume AdminContext to get and set active tab.
    const context = useContext(AdminContext);

    if (!context) {
      return null;
    }
    const { activeTab, setActiveTab } = context;

    const handleLogout = () => {
        if(auth) {
            auth.signOut().then(() => {
                navigate('/login');
            });
        }
    };

  const navLinks = [
    { name: 'Overview', tab: 'overview', icon: DashboardIcon },
    { name: 'User Management', tab: 'users', icon: AdminUsersIcon },
    { name: 'Verifications', tab: 'verifications', icon: AdminVerifyIcon },
  ];

  return (
    <aside className="z-20 flex-shrink-0 w-64 overflow-y-auto bg-black text-white">
      <div className="py-4">
        <NavLink
          className="ml-6 text-lg font-bold text-jm-green"
          to="/admin"
        >
          Admin Panel
        </NavLink>
        <ul className="mt-6">
          {navLinks.map(({ name, tab, icon: Icon }) => (
            <li className="relative px-6 py-3" key={name}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200 ${activeTab === tab ? 'text-jm-green' : 'text-gray-400'}`}
              >
                {activeTab === tab && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-jm-green rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                )}
                <Icon className="w-5 h-5" />
                <span className="ml-4">{name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="px-6 my-6">
            <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-jm-green/20 border border-transparent rounded-lg active:bg-jm-green/30 hover:bg-jm-green/30 focus:outline-none focus:shadow-outline-green"
            >
                <LogoutIcon className="w-5 h-5 mr-2" />
                Logout
            </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
