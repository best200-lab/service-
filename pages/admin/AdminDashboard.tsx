import React, { useContext } from 'react';
import AdminOverview from '../../components/admin/AdminOverview';
import AdminUserManagement from '../../components/admin/AdminUserManagement';
import AdminVerifications from '../../components/admin/AdminVerifications';
import { AdminContext } from '../../layouts/AdminLayout';

const AdminDashboardPage: React.FC = () => {
  // Fix: Consume context to determine which content to render.
  const context = useContext(AdminContext);

  if (!context) {
    return <p>Loading...</p>;
  }

  const { activeTab } = context;

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <AdminUserManagement />;
      case 'verifications':
        return <AdminVerifications />;
      case 'overview':
      default:
        return <AdminOverview />;
    }
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h1>
      {renderContent()}
    </>
  );
};

export default AdminDashboardPage;
