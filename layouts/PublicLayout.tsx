import React from 'react';
import { Outlet } from 'react-router-dom';
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
