
import React, { useState, createContext } from 'react';
// FIX: Changed import of `Outlet` from `react-router-dom` to `react-router` to fix module export error.
import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

interface AppContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

const PrivateLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AppContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Sidebar />
        <div className="flex flex-col flex-1 w-full">
          <Navbar />
          <main className="h-full overflow-y-auto bg-gray-100 dark:bg-gray-900">
            <div className="container px-6 py-8 mx-auto grid">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default PrivateLayout;