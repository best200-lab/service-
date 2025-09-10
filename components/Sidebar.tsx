import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../layouts/PrivateLayout'; // Updated import path
import {
  DashboardIcon, ServeIcon, DirectoryIcon, MessagesIcon,
  AnalyticsIcon, SettingsIcon
} from './icons';

const navLinks = [
  { to: '/dashboard', text: 'Dashboard', icon: DashboardIcon },
  { to: '/serve', text: 'Serve Process', icon: ServeIcon },
  { to: '/directory', text: 'Directory', icon: DirectoryIcon },
  { to: '/messages', text: 'Messages', icon: MessagesIcon },
  { to: '/analytics', text: 'Analytics', icon: AnalyticsIcon },
  { to: '/settings', text: 'Settings', icon: SettingsIcon },
];

const Sidebar: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { isSidebarOpen } = context;

  return (
    <aside className={`z-20 flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20'} overflow-y-auto bg-white dark:bg-gray-800 transition-all duration-300 md:block`}>
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <NavLink
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          to="/dashboard"
        >
          {isSidebarOpen ? 'Juristmind' : 'JM'}
        </NavLink>
        <ul className="mt-6">
          {navLinks.map(({ to, text, icon: Icon }) => (
            <li className="relative px-6 py-3" key={text}>
              <NavLink
                to={to}
                end={to === '/dashboard'} // `end` should be true for the root dashboard link
                className={({ isActive }) =>
                  `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${isActive ? 'text-gray-800 dark:text-gray-100' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        className="absolute inset-y-0 left-0 w-1 bg-primary-600 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"
                      ></span>
                    )}
                    <Icon className="w-5 h-5" />
                    <span className={`ml-4 ${!isSidebarOpen && 'hidden'}`}>{text}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;