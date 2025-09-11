
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../layouts/PrivateLayout'; // Updated import path
import {
  SearchIcon, NotificationIcon, MenuIcon, ChevronDownIcon,
  UserCircleIcon, SettingsIcon, LogoutIcon
} from './icons';

const Navbar: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  // Fix: Changed ref type from HTMLDivElement to HTMLLIElement to match the `li` element it's attached to.
  const profileMenuRef = useRef<HTMLLIElement>(null);
  
  const context = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Fix: Corrected typo from `profileMenuMenuRef` to `profileMenuRef`.
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!context) return null;
  const { toggleSidebar } = context;

  return (
    <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-primary-600 dark:text-primary-300">
        {/* Mobile hamburger */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-primary"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        {/* Search input */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-primary-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" />
            </div>
            <input
              className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-primary-300 focus:outline-none focus:shadow-outline-primary form-input"
              type="text"
              placeholder="Search for cases, documents, or colleagues"
              aria-label="Search"
            />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* Notifications menu */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-primary"
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <NotificationIcon className="w-5 h-5" />
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>
          </li>
          {/* Profile menu */}
          <li className="relative" ref={profileMenuRef}>
            <button
              className="align-middle rounded-full focus:shadow-outline-primary focus:outline-none"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              aria-label="Account"
              aria-haspopup="true"
            >
              <div className="flex items-center">
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src="https://i.pravatar.cc/150?u=1"
                  alt="Your avatar"
                  aria-hidden="true"
                />
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </div>
            </button>
            {isProfileMenuOpen && (
              <ul
                className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
              >
                <li>
                  <Link
                    to="/profile"
                    className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  >
                    <UserCircleIcon className="w-4 h-4 mr-3" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  >
                    <SettingsIcon className="w-4 h-4 mr-3" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="border-t dark:border-gray-600">
                  <a
                    className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    href="#logout"
                  >
                    <LogoutIcon className="w-4 h-4 mr-3" />
                    <span>Log out</span>
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;