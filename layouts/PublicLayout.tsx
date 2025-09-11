
import React from 'react';
// FIX: Changed import of `Outlet` from `react-router-dom` to `react-router` to fix module export error.
import { Outlet } from 'react-router';
import PublicHeader from '../components/PublicHeader';
import Footer from '../components/Footer';

const PublicLayout: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;