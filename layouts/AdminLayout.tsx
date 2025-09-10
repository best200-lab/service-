import React, { useState, createContext } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

// Fix: Add context to manage state between Sidebar and Dashboard.
export const AdminContext = createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
} | null>(null);

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  // Fix: Lift state up to the layout to be shared via context.
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AdminContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <AdminSidebar />
        <div className="flex flex-col flex-1 w-full">
          <main className="h-full overflow-y-auto bg-gray-100 dark:bg-gray-900">
            <div className="container px-6 py-8 mx-auto grid">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
};

export default AdminLayout;
